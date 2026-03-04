'use client'

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; pulse?: boolean }> = {
  queued: { label: 'Kuyrukta', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  running: { label: 'Çalışıyor', color: 'text-blue-400', bg: 'bg-blue-400/10', pulse: true },
  waiting_approval: { label: 'Onay Bekliyor', color: 'text-orange-400', bg: 'bg-orange-400/10', pulse: true },
  completed: { label: 'Tamamlandı', color: 'text-[#A3E635]', bg: 'bg-[#A3E635]/10' },
  failed: { label: 'Hata', color: 'text-red-400', bg: 'bg-red-400/10' },
  cancelled: { label: 'İptal', color: 'text-[#4C4462]', bg: 'bg-[#4C4462]/10' },
  pending: { label: 'Bekliyor', color: 'text-orange-400', bg: 'bg-orange-400/10', pulse: true },
  approved: { label: 'Onaylandı', color: 'text-[#A3E635]', bg: 'bg-[#A3E635]/10' },
  rejected: { label: 'Reddedildi', color: 'text-red-400', bg: 'bg-red-400/10' },
  idle: { label: 'Hazır', color: 'text-[#4C4462]', bg: 'bg-[#4C4462]/10' },
  paused: { label: 'Duraklatıldı', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
}

export default function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status] || { label: status, color: 'text-[#4C4462]', bg: 'bg-[#4C4462]/10' }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${s.color} ${s.bg}`}>
      {s.pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${s.color.replace('text-', 'bg-')}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${s.color.replace('text-', 'bg-')}`} />
        </span>
      )}
      {s.label}
    </span>
  )
}
