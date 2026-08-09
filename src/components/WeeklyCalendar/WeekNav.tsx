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
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <button
                    onClick={onPrevWeek}
                    aria-label="Tuần trước"
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition text-lg"
                >
                    ‹
                </button>

                <button
                    onClick={onNextWeek}
                    aria-label="Tuần sau"
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition text-lg"
                >
                    ›
                </button>

                <button
                    onClick={onToday}
                    className="ml-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                    Hôm nay: {formatFullDate(today)}
                </button>
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
                {formatMonthYearRange(weekDates)}
            </h2>
        </div>
    );
}