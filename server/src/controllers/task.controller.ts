// src/controllers/task.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import {
  createTaskSchema,
  updateTaskSchema,
  listTasksQuerySchema,
} from '../schemas/task.schema';

// GET /api/tasks?from=YYYY-MM-DD&to=YYYY-MM-DD
export async function listTasks(req: Request, res: Response) {
  const parsed = listTasksQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Query không hợp lệ', errors: parsed.error.flatten() });
  }

  const { from, to } = parsed.data;
  const ownerId = req.user!.userId;

  const tasks = await prisma.task.findMany({
    where: {
      ownerId,
      ...(from && to
        ? { date: { gte: new Date(from), lte: new Date(to) } }
        : {}),
    },
    orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
  });

  return res.status(200).json({ tasks });
}

// POST /api/tasks
export async function createTask(req: Request, res: Response) {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Dữ liệu không hợp lệ', errors: parsed.error.flatten() });
  }

  const { date, ...rest } = parsed.data;
  const ownerId = req.user!.userId;

  const task = await prisma.task.create({
    data: {
      ...rest,
      date: new Date(date),
      ownerId,
    },
  });

  return res.status(201).json({ task });
}

// PATCH /api/tasks/:id
export async function updateTask(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Dữ liệu không hợp lệ', errors: parsed.error.flatten() });
  }

  const ownerId = req.user!.userId;

  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ message: 'Không tìm thấy task' });
  }
  if (existing.ownerId !== ownerId) {
    return res.status(403).json({ message: 'Bạn không có quyền sửa task này' });
  }

  const { date, ...rest } = parsed.data;

  const task = await prisma.task.update({
    where: { id },
    data: {
      ...rest,
      ...(date ? { date: new Date(date) } : {}),
    },
  });

  return res.status(200).json({ task });
}

// DELETE /api/tasks/:id
export async function deleteTask(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const ownerId = req.user!.userId;

  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ message: 'Không tìm thấy task' });
  }
  if (existing.ownerId !== ownerId) {
    return res.status(403).json({ message: 'Bạn không có quyền xóa task này' });
  }

  await prisma.task.delete({ where: { id } });

  return res.status(204).send();
}