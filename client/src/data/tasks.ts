import type { Task } from "../types/task";
import { getMonday, addDays, toISODate } from "../utils/date";

const monday = getMonday(new Date());
export const tasks: Task[] = [
    {
        id: "1",
        title: "Study React",

        description: "Learn Components",

        date: toISODate(addDays(monday, 0)),

        startTime: "08:00",

        endTime: "10:00",

        completed: false,

        color: "bg-blue-400",

        createdAt: new Date(),

        updatedAt: new Date(),
    },

    {
        id: "2",

        title: "Gym",

        date: toISODate(addDays(monday, 1)),

        startTime: "18:00",

        endTime: "19:00",

        completed: true,

        color: "bg-green-400",

        createdAt: new Date(),

        updatedAt: new Date(),
    },
];