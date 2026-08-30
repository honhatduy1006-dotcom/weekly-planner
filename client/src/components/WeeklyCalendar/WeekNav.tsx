import { formatFullDate, formatMonthYearRange } from "../../utils/date";

type WeekNavProps = {
    weekDates: Date[];
    onPrevWeek: () => void;
    onNextWeek: () => void;
    onToday: () => void;
};

export default function WeekNav({ weekDates, onPrevWeek, onNextWeek, onToday }: WeekNavProps) {
    const today = new Date();

    return (
        <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
            <h2 className="order-1 text-lg font-semibold text-gray-800 sm:order-2 sm:text-xl">
                {formatMonthYearRange(weekDates)}
            </h2>

            <div className="order-2 flex items-center gap-2 sm:order-1">
                <button
                    onClick={onPrevWeek}
                    aria-label="Tuần trước"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg text-gray-600 transition hover:bg-gray-100"
                >
                    ‹
                </button>

                <button
                    onClick={onNextWeek}
                    aria-label="Tuần sau"
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
            </div>
        </div>
    );
}