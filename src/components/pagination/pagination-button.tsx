'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FC, ReactNode, memo } from 'react'

// Define interfaces for better type safety and separation of concerns
interface PaginationButtonProps {
  href: string
  disabled?: boolean
  direction?: 'prev' | 'next' | 'first' | 'last'
  children: ReactNode
}

// Separate component for the button content
interface ButtonContentProps {
  children: ReactNode
}

const ButtonContent: FC<ButtonContentProps> = ({ children }) => {
  return <>{children}</>
}

// Separate component for the disabled button state
interface DisabledButtonProps {
  children: ReactNode
}

const DisabledButton: FC<DisabledButtonProps> = ({ children }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      disabled
      className="flex items-center bg-white/80 dark:bg-[#1E1E2C]/80 border-[#3BCEAC]/20 text-muted-foreground"
    >
      <ButtonContent>{children}</ButtonContent>
    </Button>
  )
}

// Separate component for the active button state
interface ActiveButtonProps {
  href: string
  children: ReactNode
}

const ActiveButton: FC<ActiveButtonProps> = ({ href, children }) => {
  return (
    <Link href={href} prefetch={false} replace>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center bg-white/80 dark:bg-[#1E1E2C]/80 border-[#3BCEAC]/20 hover:bg-gradient-to-r hover:from-[#3BCEAC] hover:to-[#52E3C2] hover:text-white hover:border-transparent transition-all duration-300"
      >
        <ButtonContent>{children}</ButtonContent>
      </Button>
    </Link>
  )
}

// Main component
function PaginationButtonComponent({ href, disabled = false, children }: PaginationButtonProps) {
  if (disabled) {
    return <DisabledButton>{children}</DisabledButton>
  }

  return <ActiveButton href={href}>{children}</ActiveButton>
}

// Memoize the component to prevent unnecessary re-renders
export const PaginationButton = memo(PaginationButtonComponent)
