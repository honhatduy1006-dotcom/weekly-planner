import TimeColumn from "./TimeColumn";
import DayColumn from "./DayColumn";
import type { Task } from "../../types/task";
import { useRef } from "react";

type CalendarBodyProps = {
    days: string[];
    hours: string[];
    tasks: Task[];
    onEdit: (task: Task) => void;
    onMove: (task: Task) => void;
    onDelete: (task: Task) => void;
};

export default function CalendarBody({
    days,
    hours,
    tasks,
    onEdit,
    onDelete,
    onMove,
}: CalendarBodyProps) {

    const columnRects = useRef<Map<string, DOMRect>>(
        new Map()
    );

    const registerColumn = (
        day: string,
        rect: DOMRect
    ) => { columnRects.current.set(day, rect); };

    const getDayFromClientX = (
    clientX: number
    ): string | null => {

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

    return (
        <div 
            className="
                grid
                grid-cols-[90px_repeat(7,minmax(0,1fr))]
            "
        >
            <TimeColumn hours={hours} />

            {days.map((day) => (
                <DayColumn
                    key={day}
                    day={day}
                    hours={hours}
                    tasks={tasks}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onMove={onMove}
                    registerColumn={registerColumn}
                    getDayFromClientX={getDayFromClientX}
                />
            ))}
        </div>
    );
}