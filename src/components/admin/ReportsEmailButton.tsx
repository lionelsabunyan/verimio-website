'use client'

import { useState } from 'react'
import SendEmailModal from './SendEmailModal'

interface Props {
  email: string
  pdfUrl?: string
}

export default function ReportsEmailButton({ email, pdfUrl }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs px-3 py-1.5 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-[#F59E0B] hover:bg-[#1E293B]/80 transition-colors border border-[#1E293B]"
      >
        Email
      </button>
      {open && (
        <SendEmailModal
          leadEmail={email}
          pdfUrl={pdfUrl}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
