'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface InlineImageProps {
  src?: string
  alt?: string
}

export default function InlineImage({ src, alt }: InlineImageProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  if (!src) return null

  return (
    <>
      <span className="block my-8 cursor-zoom-in" onClick={handleOpen}>
        <Image
          src={src}
          alt={alt || ''}
          width={1200}
          height={630}
          className="w-full h-auto rounded-lg border border-border"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </span>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out p-4"
          onClick={handleClose}
        >
          <Image
            src={src}
            alt={alt || ''}
            width={1200}
            height={630}
            className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain"
            sizes="95vw"
            priority
          />
        </div>
      )}
    </>
  )
}
