import TimeColumn from "./TimeColumn";
import DayColumn from "./DayColumn";

type CalendarBodyProps = {
    days: string[];
    hours: string[];
};

export default function CalendarBody({
    days,
    hours,
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
                />
            ))}
        </div>
    );
}