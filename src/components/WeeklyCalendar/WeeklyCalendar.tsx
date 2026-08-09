import { HOURS } from "../../data/calendar";
import CalendarHeader from "./CalendarHeader";
import WeekNav from "./WeekNav";
import CalendarBody from "./CalendarBody";
import type { Task } from "../../types/task";

type WeeklyCalendarProps = {
    tasks: Task[];
    weekDates: Date[];
    onEdit(task: Task): void;
    onDelete(task: Task): void;
    onMove: (task: Task) => void;
    onCreateTask: (day: string, startTime: string, endTime: string) => void;
    onPrevWeek: () => void;
    onNextWeek: () => void;
    onToday: () => void;
};

export default function WeeklyCalendar({
    tasks,
    weekDates,
    onEdit,
    onDelete,
    onMove,
    onCreateTask,
    onPrevWeek,
    onNextWeek,
    onToday,
    
}: WeeklyCalendarProps) {
    return (
        <div className="mx-auto mt-8 w-[95%] max-w-7xl rounded-xl bg-white shadow-md overflow-hidden">
            <WeekNav
                weekDates={weekDates}
                onPrevWeek={onPrevWeek}
                onNextWeek={onNextWeek}
                onToday={onToday}
            />
            
            <CalendarHeader weekDates={weekDates} />

            <CalendarBody
                weekDates={weekDates}
                hours={HOURS}
                tasks={tasks}
                onEdit={onEdit}
                onDelete={onDelete}
                onMove={onMove}
                onCreateTask={onCreateTask}

            />
        </div>
    );
}