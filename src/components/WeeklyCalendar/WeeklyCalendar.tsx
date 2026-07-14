import { DAYS, HOURS } from "../../data/calendar";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

export default function WeeklyCalendar() {
    return (
        <div className="w-full p-6">
            <CalendarHeader days={DAYS} />

            <CalendarBody
                days={DAYS}
                hours={HOURS}
            />
        </div>
    );
}