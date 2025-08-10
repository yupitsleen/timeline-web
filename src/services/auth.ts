import type { User } from '../types/app'
import { apiClient } from './api'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

export class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    
    if (response.data.token) {
      apiClient.setAuthToken(response.data.token)
    }
    
    return response.data
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData)
    
    if (response.data.token) {
      apiClient.setAuthToken(response.data.token)
    }
    
    return response.data
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    })
    
    if (response.data.token) {
      apiClient.setAuthToken(response.data.token)
    }
    
    return response.data
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me')
    return response.data
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiClient.patch<User>('/auth/profile', userData)
    return response.data
  }
}

export const authService = new AuthService()
export default authService