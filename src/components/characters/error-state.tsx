import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { ApiError } from '@/services/api/client'
import { motion } from 'framer-motion'

interface ErrorStateProps {
  error?: ApiError
  onRetry?: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps = {}) {
  const defaultMessage = 'An error occurred while loading characters.'
  const message = error?.message || defaultMessage
  const isNetworkError = error?.isNetworkError || false

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md w-full shadow-lg">
        <div className="flex items-center mb-4">
          <div className="bg-red-100 dark:bg-red-800/30 p-2 rounded-full mr-3">
            <AlertCircle className="h-6 w-6 text-red-500 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
            {isNetworkError ? 'Connection Error' : 'Data Loading Error'}
          </h3>
        </div>

        <div className="mb-4 text-red-600 dark:text-red-300">
          <p>{message}</p>

          {error?.statusCode && (
            <p className="mt-2 text-sm text-red-500 dark:text-red-400">
              Error Code: {error.statusCode}
            </p>
          )}

          {isNetworkError && (
            <p className="mt-2 text-sm">Check your internet connection and try again.</p>
          )}
        </div>

        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-red-300 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-800/30 text-red-600 dark:text-red-300"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
        )}
      </div>
    </motion.div>
  )
}
