'use client'

import { PaginationButton } from '@/components/pagination/pagination-button'
import { PageNumberButton } from '@/components/pagination/page-number-button'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback, FC, memo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Sparkles } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 25 }
  }
}

// Helper function to generate page numbers
function generatePageNumbers(currentPage: number, totalPages: number): number[] {
  const pageNumbers = []
  const maxPagesToShow = 5

  if (totalPages <= maxPagesToShow) {
    // Show all pages if total pages are less than max pages to show
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    // Always show first page
    pageNumbers.push(1)

    // Calculate start and end of page range
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)

    // Adjust if at the beginning or end
    if (currentPage <= 2) {
      end = Math.min(totalPages - 1, maxPagesToShow - 1)
    } else if (currentPage >= totalPages - 1) {
      start = Math.max(2, totalPages - maxPagesToShow + 2)
    }

    // Add ellipsis if needed
    if (start > 2) {
      pageNumbers.push(-1) // -1 represents ellipsis
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis if needed
    if (end < totalPages - 1) {
      pageNumbers.push(-2) // -2 represents ellipsis
    }

    // Always show last page
    pageNumbers.push(totalPages)
  }

  return pageNumbers
}

// Helper hook for query string management
function useQueryStringParams() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const createQueryString = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', page.toString())
      return params.toString()
    },
    [searchParams]
  )

  const navigateToPage = useCallback(
    (page: number) => {
      const queryString = createQueryString(page)
      router.push(`/?${queryString}`, { scroll: false })
    },
    [createQueryString, router]
  )

  return { createQueryString, navigateToPage }
}

// Decorative Elements Component
const DecorativeElements: FC = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3BCEAC] via-[#52E3C2] to-[#0E103D]"></div>
      <div className="absolute top-3 left-3 h-5 w-5 rounded-full bg-[#3BCEAC]/10 flex items-center justify-center">
        <Sparkles className="h-2.5 w-2.5 text-[#3BCEAC]" />
      </div>
      <div className="absolute bottom-3 right-3 h-5 w-5 rounded-full bg-[#52E3C2]/10 flex items-center justify-center">
        <Sparkles className="h-2.5 w-2.5 text-[#52E3C2]" />
      </div>
    </>
  )
}

// Info Text Component
interface InfoTextProps {
  currentPage: number
  totalPages: number
}

const InfoText: FC<InfoTextProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="hidden md:flex items-center mr-4 text-sm font-medium bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] bg-clip-text text-transparent">
      <span>
        Page {currentPage} of {totalPages}
      </span>
    </div>
  )
}

// First Page Button Component
interface FirstPageButtonProps {
  currentPage: number
  createQueryString: (page: number) => string
  navigateToPage: (page: number) => void
}

const FirstPageButton: FC<FirstPageButtonProps> = ({
  currentPage,
  createQueryString,
  navigateToPage
}) => {
  const handleClick = () => {
    if (currentPage > 1) {
      navigateToPage(1)
    }
  }

  return (
    <div className="hidden md:block">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {currentPage > 1 ? (
          <div onClick={handleClick}>
            <PaginationButton href={`/?${createQueryString(1)}`} direction="first">
              <ChevronsLeft className="h-4 w-4" />
            </PaginationButton>
          </div>
        ) : (
          <PaginationButton href="" disabled direction="first">
            <ChevronsLeft className="h-4 w-4" />
          </PaginationButton>
        )}
      </motion.div>
    </div>
  )
}

// Previous Button Component
interface PreviousButtonProps {
  currentPage: number
  createQueryString: (page: number) => string
  navigateToPage: (page: number) => void
}

const PreviousButton: FC<PreviousButtonProps> = ({
  currentPage,
  createQueryString,
  navigateToPage
}) => {
  const handleClick = () => {
    if (currentPage > 1) {
      navigateToPage(currentPage - 1)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {currentPage > 1 ? (
        <div onClick={handleClick}>
          <PaginationButton href={`/?${createQueryString(currentPage - 1)}`} direction="prev">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Previous</span>
          </PaginationButton>
        </div>
      ) : (
        <PaginationButton href="" disabled direction="prev">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </PaginationButton>
      )}
    </motion.div>
  )
}

// Page Numbers Component
interface PageNumbersProps {
  pageNumbers: number[]
  currentPage: number
  createQueryString: (page: number) => string
  navigateToPage: (page: number) => void
}

const PageNumbers: FC<PageNumbersProps> = ({
  pageNumbers,
  currentPage,
  createQueryString,
  navigateToPage
}) => {
  const handlePageClick = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber !== currentPage) {
      navigateToPage(pageNumber)
    }
  }

  return (
    <div className="flex items-center mx-2 bg-white/50 dark:bg-[#1E1E2C]/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-[#3BCEAC]/20">
      {pageNumbers.map((pageNumber, index) =>
        pageNumber < 0 ? (
          <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <motion.div
            key={pageNumber}
            className="mx-0.5"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageClick(pageNumber)}
          >
            <PageNumberButton
              pageNumber={pageNumber}
              currentPage={currentPage}
              href={`/?${createQueryString(pageNumber)}`}
            />
          </motion.div>
        )
      )}
    </div>
  )
}

// Next Button Component
interface NextButtonProps {
  currentPage: number
  totalPages: number
  createQueryString: (page: number) => string
  navigateToPage: (page: number) => void
}

const NextButton: FC<NextButtonProps> = ({
  currentPage,
  totalPages,
  createQueryString,
  navigateToPage
}) => {
  const handleClick = () => {
    if (currentPage < totalPages) {
      navigateToPage(currentPage + 1)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {currentPage < totalPages ? (
        <div onClick={handleClick}>
          <PaginationButton href={`/?${createQueryString(currentPage + 1)}`} direction="next">
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </PaginationButton>
        </div>
      ) : (
        <PaginationButton href="" disabled direction="next">
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </PaginationButton>
      )}
    </motion.div>
  )
}

// Last Page Button Component
interface LastPageButtonProps {
  currentPage: number
  totalPages: number
  createQueryString: (page: number) => string
  navigateToPage: (page: number) => void
}

const LastPageButton: FC<LastPageButtonProps> = ({
  currentPage,
  totalPages,
  createQueryString,
  navigateToPage
}) => {
  const handleClick = () => {
    if (currentPage < totalPages) {
      navigateToPage(totalPages)
    }
  }

  return (
    <div className="hidden md:block">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {currentPage < totalPages ? (
          <div onClick={handleClick}>
            <PaginationButton href={`/?${createQueryString(totalPages)}`} direction="last">
              <ChevronsRight className="h-4 w-4" />
            </PaginationButton>
          </div>
        ) : (
          <PaginationButton href="" disabled direction="last">
            <ChevronsRight className="h-4 w-4" />
          </PaginationButton>
        )}
      </motion.div>
    </div>
  )
}

// Main Pagination Component
function PaginationComponent({ currentPage, totalPages }: PaginationProps) {
  const { createQueryString, navigateToPage } = useQueryStringParams()

  // Generate page numbers to display
  const pageNumbers = generatePageNumbers(currentPage, totalPages)

  if (totalPages <= 1) {
    return null
  }

  return (
    <motion.nav
      aria-label="Pagination"
      className="mt-12 mb-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex justify-center items-center" variants={itemVariants}>
        <div className="relative inline-flex items-center gap-2 px-6 py-4 bg-white dark:bg-[#1E1E2C] rounded-xl border border-[#3BCEAC]/20 shadow-lg">
          <DecorativeElements />
          <InfoText currentPage={currentPage} totalPages={totalPages} />
          <FirstPageButton
            currentPage={currentPage}
            createQueryString={createQueryString}
            navigateToPage={navigateToPage}
          />
          <PreviousButton
            currentPage={currentPage}
            createQueryString={createQueryString}
            navigateToPage={navigateToPage}
          />
          <PageNumbers
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            createQueryString={createQueryString}
            navigateToPage={navigateToPage}
          />
          <NextButton
            currentPage={currentPage}
            totalPages={totalPages}
            createQueryString={createQueryString}
            navigateToPage={navigateToPage}
          />
          <LastPageButton
            currentPage={currentPage}
            totalPages={totalPages}
            createQueryString={createQueryString}
            navigateToPage={navigateToPage}
          />
        </div>
      </motion.div>
    </motion.nav>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const Pagination = memo(PaginationComponent)
