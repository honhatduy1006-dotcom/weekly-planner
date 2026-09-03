import { HOURS } from "../../data/calendar";
import CalendarHeader from "./CalendarHeader";
import WeekNav from "./WeekNav";
import CalendarBody from "./CalendarBody";
import type { Task } from "../../types/task";

type ViewMode = "week" | "day";

type WeeklyCalendarProps = {
    tasks: Task[];
    weekDates: Date[];
    viewMode: ViewMode;
    onSelectDay: (date: Date) => void;
    onBackToWeek: () => void;
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
    viewMode,
    onSelectDay,
    onBackToWeek,
    onEdit,
    onDelete,
    onMove,
    onCreateTask,
    onPrevWeek,
    onNextWeek,
    onToday,
    
}: WeeklyCalendarProps) {
    const minWidth = 90 + weekDates.length * 95;

    return (
        <div className="mx-auto mt-8 w-[95%] max-w-7xl rounded-xl bg-white shadow-md">
            <WeekNav
                weekDates={weekDates}
                viewMode={viewMode}
                onPrevWeek={onPrevWeek}
                onNextWeek={onNextWeek}
                onToday={onToday}
                onBackToWeek={onBackToWeek}
            />

            <div className="overflow-x-auto">
                <div style={{ minWidth }}>
                    <CalendarHeader
                        weekDates={weekDates}
                        viewMode={viewMode}
                        onSelectDay={onSelectDay}
                />

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