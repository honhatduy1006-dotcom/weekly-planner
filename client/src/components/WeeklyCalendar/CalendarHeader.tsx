import { getWeekdayKey, formatDayNumber, isToday } from "../../utils/date";

type ViewMode = "week" | "day";

type CalendarHeaderProps = {
    weekDates: Date[];
    viewMode: ViewMode;
    onSelectDay: (date: Date) => void;
};

export default function CalendarHeader({ weekDates, viewMode, onSelectDay }: CalendarHeaderProps) {
    const gridTemplateColumns = `90px repeat(${weekDates.length}, minmax(95px, 1fr))`;

    return (
        <div className="grid bg-gray-50" style={{ gridTemplateColumns }}>
            <div className="border border-gray-200 py-4 text-center font-semibold text-gray-700">
                Time
            </div>

            {weekDates.map((date) => {
                const today = isToday(date);

                return (
                    <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => viewMode === "week" && onSelectDay(date)}
                        className={`border border-gray-200 py-3 text-center transition ${
                            today ? "bg-blue-50" : ""
                        } ${viewMode === "week" ? "cursor-pointer hover:bg-gray-100" : "cursor-default"}`}
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
                    </button>
                );
            })}
        </div>
    );
}