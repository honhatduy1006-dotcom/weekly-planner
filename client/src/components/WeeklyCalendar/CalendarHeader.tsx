import { getWeekdayKey, formatDayNumber, isToday } from "../../utils/date";

type CalendarHeaderProps = {
    weekDates: Date[];
};

export default function CalendarHeader({ weekDates }: CalendarHeaderProps) {
    return (
        <div
            className="
                grid
                grid-cols-[90px_repeat(7,minmax(95px,1fr))]
                bg-gray-50
            "
        >
            <div className="border border-gray-200 py-4 text-center font-semibold text-gray-700">
                Time
            </div>

            {weekDates.map((date) => {
                const today = isToday(date);

                return (
                    <div
                        key={date.toISOString()}
                        className={`border border-gray-200 py-3 text-center ${today ? "bg-blue-50" : ""}`}
                    >
                        <div className={`text-xs font-semibold uppercase ${today ? "text-blue-600" : "text-gray-500"}`}>
                            {getWeekdayKey(date)}
                        </div>
                        <div
                            className={`
                                mt-1 inline-flex items-center justify-center
                                w-8 h-8 rounded-full text-lg font-semibold
                                ${today ? "bg-blue-600 text-white" : "text-gray-800"}
                            `}
                        >
                            {formatDayNumber(date)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}