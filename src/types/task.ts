export interface Task {
    id: string;

    title: string;

    description?: string;

    date: string;

    startTime: string;

    endTime: string;

    completed: boolean;

    color: string;

    createdAt: Date;
    updatedAt: Date;

}