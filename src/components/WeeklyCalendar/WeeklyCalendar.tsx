import { DAYS, HOURS } from "../../data/calendar";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import { tasks } from "../../data/tasks";

export default function WeeklyCalendar() {
    return (
        <div className="mx-auto mt-8 w-[95%] max-w-7xl rounded-xl bg-white shadow-md overflow-hidden">
            <CalendarHeader days={DAYS} />

            <CalendarBody
                days={DAYS}
                hours={HOURS}
                tasks={tasks}
            />
        </div>
    );
}