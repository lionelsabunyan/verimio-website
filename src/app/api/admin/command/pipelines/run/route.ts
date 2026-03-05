import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Pipeline başlat — run oluştur + ilk job'u kuyruğa ekle
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { pipeline_id, input } = body

  if (!pipeline_id) {
    return NextResponse.json({ error: 'pipeline_id zorunlu' }, { status: 400 })
  }

  // Pipeline şablonunu çek
  const { data: pipeline, error: pipeErr } = await supabase
    .from('pipelines')
    .select('*')
    .eq('id', pipeline_id)
    .single()

  if (pipeErr || !pipeline) {
    return NextResponse.json({ error: 'Pipeline bulunamadı' }, { status: 404 })
  }

  const steps = pipeline.steps as Array<{
    skill: string
    label: string
    input_template: string
    approval_before?: boolean
    approval_title?: string
  }>

  if (!steps || steps.length === 0) {
    return NextResponse.json({ error: 'Pipeline adımları boş' }, { status: 400 })
  }

  // Pipeline run oluştur
  const { data: run, error: runErr } = await supabase
    .from('pipeline_runs')
    .insert({
      pipeline_id: pipeline.id,
      project: pipeline.project,
      name: pipeline.name,
      status: 'running',
      current_step: 0,
      total_steps: steps.length,
      steps_snapshot: steps,
      input: input || null,
    })
    .select()
    .single()

  if (runErr || !run) {
    return NextResponse.json(
      { error: runErr?.message || 'Run oluşturulamadı' },
      { status: 500 }
    )
  }

  // İlk adım input'unu resolve et
  const firstStep = steps[0]
  const resolvedInput = (firstStep.input_template || '')
    .replace(/\{user_input\}/g, input || '')

  // İlk job'u oluştur
  const { error: jobErr } = await supabase.from('command_jobs').insert({
    project: pipeline.project,
    pipeline_run_id: run.id,
    step_index: 0,
    skill: firstStep.skill,
    input: { prompt: resolvedInput },
    priority: 1,
    status: 'queued',
    created_by: 'pipeline',
  })

  if (jobErr) {
    // Job oluşturulamadıysa run'ı fail et
    await supabase
      .from('pipeline_runs')
      .update({
        status: 'failed',
        error: `İlk job oluşturulamadı: ${jobErr.message}`,
        completed_at: new Date().toISOString(),
      })
      .eq('id', run.id)

    return NextResponse.json({ error: jobErr.message }, { status: 500 })
  }

  return NextResponse.json({ run })
}
