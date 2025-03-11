'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PageButtonProps {
  pageNumber: number
  currentPage: number
  href: string
}

export function PageButton({ pageNumber, currentPage, href }: PageButtonProps) {
  const isActive = currentPage === pageNumber

  return (
    <Link href={href} prefetch={false} replace>
      <Button
        variant={isActive ? 'default' : 'outline'}
        size="sm"
        className={`w-8 h-8 p-0 ${!isActive ? 'cursor-pointer' : ''}`}
      >
        {pageNumber}
      </Button>
    </Link>
  )
}
