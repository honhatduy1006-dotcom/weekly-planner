import TimeColumn from "./TimeColumn";
import DayColumn from "./DayColumn";
import type { Task } from "../../types/task";

type CalendarBodyProps = {
    days: string[];
    hours: string[];
    tasks: Task[];
};

export default function CalendarBody({
    days,
    hours,
    tasks,
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
                />
            ))}
        </div>
    );
}