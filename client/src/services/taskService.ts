import api from './api';
import type { Task, CreateTaskPayload, UpdateTaskPayload } from '../types/task';

// Chuẩn hóa date trả về từ backend (ISO datetime) thành YYYY-MM-DD
function normalizeTask(task: Task): Task {
  return { ...task, date: task.date.slice(0, 10) };
}

export async function fetchTasks(from: string, to: string): Promise<Task[]> {
  const res = await api.get<{ tasks: Task[] }>('/tasks', { params: { from, to } });
  return res.data.tasks.map(normalizeTask);
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const res = await api.post<{ task: Task }>('/tasks', payload);
  return normalizeTask(res.data.task);
}

export async function updateTask(id: string, payload: UpdateTaskPayload): Promise<Task> {
  const res = await api.patch<{ task: Task }>(`/tasks/${id}`, payload);
  return normalizeTask(res.data.task);
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}