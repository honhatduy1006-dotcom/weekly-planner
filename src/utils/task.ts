import type { Task } from "../types/task";
import { timeToMinutes } from "./time";

/**
 * Kiểm tra 2 task có bị trùng thời gian hay không
 */
export function isTaskOverlap(
    taskA: Task,
    taskB: Task
): boolean {

    // Khác ngày thì chắc chắn không trùng
    if (taskA.day !== taskB.day) {
        return false;
    }

    const startA = timeToMinutes(taskA.startTime);
    const endA = timeToMinutes(taskA.endTime);

    const startB = timeToMinutes(taskB.startTime);
    const endB = timeToMinutes(taskB.endTime);

    return (
        startA < endB &&
        endA > startB
    );
}

/**
 * Trả về tất cả task bị trùng với task mới
 */
export function getOverlappingTasks(
    tasks: Task[],
    targetTask: Task
): Task[] {

    return tasks.filter(task => {

        // Khi Edit thì bỏ qua chính nó
        if (task.id === targetTask.id) {
            return false;
        }

        return isTaskOverlap(task, targetTask);
    });

}