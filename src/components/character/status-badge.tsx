'use client'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Alive':
        return 'bg-green-500 ring-green-500/20'
      case 'Dead':
        return 'bg-red-500 ring-red-500/20'
      default:
        return 'bg-gray-500 ring-gray-500/20'
    }
  }

  return (
    <span className={`relative flex h-3 w-3 ${getStatusStyles()}`}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-inherit"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-inherit ring-2 ring-offset-2"></span>
    </span>
  )
}
