import type { Task } from "../types/task";

export const tasks: Task[] = [
    {
        id: "1",
        title: "Study React",
        description: "Learn Components",

        day: "Mon",
        startTime: "08:00",
        endTime: "10:00",

        completed: false,
        color: "bg-blue-400",

        createdAt: new Date("2026-07-15T08:00:00"),
        updatedAt: new Date("2026-07-15T08:00:00"),
    },
    {
        id: "2",
        title: "Gym",

        day: "Tue",
        startTime: "18:00",
        endTime: "19:00",

        completed: true,
        color: "bg-green-400",

        createdAt: new Date("2026-07-14T18:00:00"),
        updatedAt: new Date("2026-07-14T18:30:00"),
    },
];