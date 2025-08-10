import { env } from '../utils/env'

export interface ApiResponse<T = any> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export interface ApiError {
  message: string
  status: number
  errors?: string[]
}

class ApiClient {
  private baseURL: string
  private timeout: number

  constructor(baseURL: string = env.API_BASE_URL, timeout: number = env.API_TIMEOUT) {
    this.baseURL = baseURL.replace(/\/$/, '')
    this.timeout = timeout
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const controller = new AbortController()
    
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.text()
        let parsedError
        
        try {
          parsedError = JSON.parse(errorData)
        } catch {
          parsedError = { message: errorData }
        }

        throw {
          message: parsedError.message || `HTTP ${response.status}`,
          status: response.status,
          errors: parsedError.errors,
        } as ApiError
      }

      const data = await response.json()
      return data
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error && error.name === 'AbortError') {
        throw {
          message: 'Request timeout',
          status: 408,
        } as ApiError
      }

      if ((error as ApiError).status) {
        throw error
      }

      throw {
        message: 'Network error',
        status: 0,
      } as ApiError
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T, D = any>(endpoint: string, data?: D): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T, D = any>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async patch<T, D = any>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  setAuthToken(token: string) {
    this.request = this.request.bind(this)
    const originalRequest = this.request

    this.request = async <T>(endpoint: string, options: RequestInit = {}) => {
      return originalRequest<T>(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      })
    }
  }
}

export const apiClient = new ApiClient()
export default apiClient