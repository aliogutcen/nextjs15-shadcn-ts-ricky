'use client'

import Image from 'next/image'

interface CharacterImageProps {
  src: string
  alt: string
}

export function CharacterImage({ src, alt }: CharacterImageProps) {
  return (
    <div className="relative w-full h-56 overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
