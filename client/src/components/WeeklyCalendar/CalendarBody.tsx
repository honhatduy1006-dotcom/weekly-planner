import TimeColumn from "./TimeColumn";
import DayColumn from "./DayColumn";
import type { Task } from "../../types/task";
import { useRef } from "react";
import { toISODate } from "../../utils/date";

type CalendarBodyProps = {
    weekDates: Date[];
    hours: string[];
    tasks: Task[];
    onEdit: (task: Task) => void;
    onMove: (task: Task) => void;
    onDelete: (task: Task) => void;
    onCreateTask: (date: string, startTime: string, endTime: string) => void;
};

export default function CalendarBody({
    weekDates,
    hours,
    tasks,
    onEdit,
    onDelete,
    onMove,
    onCreateTask,
}: CalendarBodyProps) {

    const columnRects = useRef<Map<string, DOMRect>>(new Map());

    const registerColumn = (date: string, rect: DOMRect) => {
         columnRects.current.set(date, rect); 
    };

    const getDateFromClientX = (clientX: number): string | null => {
        for (const [day, rect] of columnRects.current) {
            if (
                clientX >= rect.left &&
                clientX <= rect.right
            ) {
                return day;
            }
        }
        return null;
    };

    const gridTemplateColumns = `90px repeat(${weekDates.length}, minmax(95px, 1fr))`;

    return (
        <div 
            className="grid" style={{ gridTemplateColumns }}>
            <TimeColumn hours={hours} />

            {weekDates.map((dateObj) => {
                const isoDate = toISODate(dateObj);

            return (
                <DayColumn
                    key={isoDate}
                    date={isoDate}
                    hours={hours}
                    tasks={tasks}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onMove={onMove}
                    onCreateTask={onCreateTask} 
                    registerColumn={registerColumn}
                    getDateFromClientX={getDateFromClientX}
                />
                );
            })}
        </div>
    );
}