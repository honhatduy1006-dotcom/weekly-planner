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
    onCreateTask: (date: string, startTime: string, endTime: string) => void;
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
        <div className="mx-auto mt-8 w-[95%] max-w-7xl rounded-xl bg-white shadow-md">
            <WeekNav
                weekDates={weekDates}
                onPrevWeek={onPrevWeek}
                onNextWeek={onNextWeek}
                onToday={onToday}
            />

            <div className="overflow-x-auto">
                <div className="min-w-[760px]">
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
            </div>
        </div>
    );
}