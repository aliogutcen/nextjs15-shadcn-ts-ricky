import axios, { AxiosError } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://rickandmortyapi.com/api'

// Create API client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Define custom error type
export interface ApiError {
  statusCode?: number
  message: string
  originalError: Error
  isNetworkError: boolean
}

// Add error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Log error
    console.error('API Error:', error)

    // Create custom error object
    const customError: ApiError = {
      statusCode: error.response?.status,
      message:
        error.response?.data &&
        typeof error.response.data === 'object' &&
        'error' in error.response.data
          ? String(error.response.data.error)
          : 'An error occurred',
      originalError: error,
      isNetworkError: error.message === 'Network Error'
    }

    return Promise.reject(customError)
  }
)

export default apiClient
