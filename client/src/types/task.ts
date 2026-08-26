export interface Task {
    id: string;

    title: string;

    description?: string;

    date: string;

    startTime: string;

    endTime: string;

    completed: boolean;

    color: string;

    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskPayload {
    title: string;
    description?: string;
    date: string;
    startTime: string;
    endTime: string;
    color: string;
    completed?: boolean;
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;