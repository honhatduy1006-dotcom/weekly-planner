import api from './api';
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../types/auth';

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/register', payload);
  return res.data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/login', payload);
  return res.data;
}

export async function getCurrentUser(): Promise<User> {
  const res = await api.get<{ user: User }>('/auth/me');
  return res.data.user;
}