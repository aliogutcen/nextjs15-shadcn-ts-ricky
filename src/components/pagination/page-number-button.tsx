'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FC, memo } from 'react'

// Define interfaces for better type safety and separation of concerns
interface PageNumberButtonProps {
  pageNumber: number
  currentPage: number
  href: string
}

// Style configuration based on active state
interface ButtonStyleConfig {
  variant: 'default' | 'outline'
  className: string
}

// Helper function to get button style configuration
const getButtonStyleConfig = (isActive: boolean): ButtonStyleConfig => {
  return {
    variant: isActive ? 'default' : 'outline',
    className: isActive
      ? 'w-9 h-9 p-0 bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] text-white border-transparent shadow-md'
      : 'w-9 h-9 p-0 bg-white/80 dark:bg-[#1E1E2C]/80 border-[#3BCEAC]/20 hover:bg-gradient-to-r hover:from-[#3BCEAC] hover:to-[#52E3C2] hover:text-white hover:border-transparent transition-all duration-300'
  }
}

// Button content component
interface ButtonContentProps {
  pageNumber: number
}

const ButtonContent: FC<ButtonContentProps> = ({ pageNumber }) => {
  return <>{pageNumber}</>
}

// Button wrapper component
interface ButtonWrapperProps {
  href: string
  styleConfig: ButtonStyleConfig
  pageNumber: number
}

const ButtonWrapper: FC<ButtonWrapperProps> = ({ href, styleConfig, pageNumber }) => {
  return (
    <Link href={href} prefetch={false} replace>
      <Button variant={styleConfig.variant} size="sm" className={styleConfig.className}>
        <ButtonContent pageNumber={pageNumber} />
      </Button>
    </Link>
  )
}

// Main component
function PageNumberButtonComponent({ pageNumber, currentPage, href }: PageNumberButtonProps) {
  const isActive = currentPage === pageNumber
  const styleConfig = getButtonStyleConfig(isActive)

  return <ButtonWrapper href={href} styleConfig={styleConfig} pageNumber={pageNumber} />
}

// Memoize the component to prevent unnecessary re-renders
export const PageNumberButton = memo(PageNumberButtonComponent)
