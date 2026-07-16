import TimeColumn from "./TimeColumn";
import DayColumn from "./DayColumn";
import type { Task } from "../../types/task";

type CalendarBodyProps = {
    days: string[];
    hours: string[];
    tasks: Task[];
    onEdit: (task: Task) => void;

    onDelete: (task: Task) => void;
};

export default function CalendarBody({
    days,
    hours,
    tasks,
    onEdit,
    onDelete,
}: CalendarBodyProps) {
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
                />
            ))}
        </div>
    );
}