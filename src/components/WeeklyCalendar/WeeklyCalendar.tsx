import { DAYS, HOURS } from "../../data/calendar";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import { tasks } from "../../data/tasks";
import type { Task } from "../../types/task";

type WeeklyCalendarProps = {
    tasks: Task[];
    onEdit(task: Task): void;
    onDelete(task: Task): void;
    onMove: (task: Task) => void;
};

export default function WeeklyCalendar({
    tasks,
    onEdit,
    onDelete,
    onMove,
    
}: WeeklyCalendarProps) {
    return (
        <div className="mx-auto mt-8 w-[95%] max-w-7xl rounded-xl bg-white shadow-md overflow-hidden">
            <CalendarHeader days={DAYS} />

            <CalendarBody
                days={DAYS}
                hours={HOURS}
                tasks={tasks}
                onEdit={onEdit}
                onDelete={onDelete}
                onMove={onMove}

            />
        </div>
    );
}