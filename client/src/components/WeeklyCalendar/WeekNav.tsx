import { formatFullDate, formatMonthYearRange, getWeekdayKey } from "../../utils/date";

type ViewMode = "week" | "day";

type WeekNavProps = {
    weekDates: Date[];
    viewMode: ViewMode;
    onPrevWeek: () => void;
    onNextWeek: () => void;
    onToday: () => void;
    onBackToWeek: () => void;
};

export default function WeekNav({
    weekDates,
    viewMode,
    onPrevWeek,
    onNextWeek,
    onToday,
    onBackToWeek,
}: WeekNavProps) {
    const today = new Date();

    const title = viewMode === "day"
        ? `${getWeekdayKey(weekDates[0])} • ${formatFullDate(weekDates[0])}`
        : formatMonthYearRange(weekDates);

    return (
        <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
            <h2 className="order-1 text-lg font-semibold text-gray-800 sm:order-2 sm:text-xl">
                {title}
            </h2>

            <div className="order-2 flex items-center gap-2 sm:order-1">
                <button
                    onClick={onPrevWeek}
                    aria-label={viewMode === "day" ? "Ngày trước" : "Tuần trước"}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg text-gray-600 transition hover:bg-gray-100"
                >
                    ‹
                </button>

                <button
                    onClick={onNextWeek}
                    aria-label={viewMode === "day" ? "Ngày sau" : "Tuần sau"}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg text-gray-600 transition hover:bg-gray-100"
                >
                    ›
                </button>

                <button
                    onClick={onToday}
                    className="ml-1 whitespace-nowrap rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100 sm:ml-2 sm:px-4 sm:text-sm"
                >
                    Hôm nay: {formatFullDate(today)}
                </button>

                {viewMode === "day" && (
                    <button
                        onClick={onBackToWeek}
                        className="ml-1 whitespace-nowrap rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100 sm:ml-2 sm:px-4 sm:text-sm"
                    >
                        Về tuần
                    </button>
                )}
            </div>
        </div>
    );
}