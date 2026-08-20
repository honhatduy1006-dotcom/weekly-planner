import { useState } from "react";
import { formatMonthYear, isSameDate, isToday } from "../../utils/date";

type MiniMonthSidebarProps = {
    isOpen: boolean;
    weekDates: Date[];
    onSelectDate: (date: Date) => void;
};

const WEEKDAY_LABELS_VI = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonthGrid(monthDate: Date): Date[] {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const jsDay = firstOfMonth.getDay();
    const startOffset = (jsDay + 6) % 7; // 0 = Chủ nhật
    const gridStart = new Date(year, month, 1 - startOffset);

    return Array.from({ length: 42 }, (_, i) => {
        const d = new Date(gridStart);
        d.setDate(gridStart.getDate() + i);
        return d;
    });
}

export default function MiniMonthSidebar({ isOpen, weekDates, onSelectDate }: MiniMonthSidebarProps) {
    const [viewMonth, setViewMonth] = useState<Date>(
        () => new Date(weekDates[0].getFullYear(), weekDates[0].getMonth(), 1)
    );

    const goPrevMonth = () =>
        setViewMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const goNextMonth = () =>
        setViewMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    const gridDates = getMonthGrid(viewMonth);

    return (
        <div
            className={`shrink-0 overflow-hidden border-r border-gray-200 bg-white transition-all duration-300 ease-in-out ${
                isOpen ? "w-72" : "w-0"
            }`}
        >
            <div className="w-72 p-4">
                <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800">
                        {formatMonthYear(viewMonth)}
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={goPrevMonth}
                            aria-label="Tháng trước"
                            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
                        >
                            ‹
                        </button>
                        <button
                            onClick={goNextMonth}
                            aria-label="Tháng sau"
                            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
                        >
                            ›
                        </button>
                    </div>
                </div>

                <div className="mb-1 grid grid-cols-7 text-center text-xs text-gray-500">
                    {WEEKDAY_LABELS_VI.map(label => (
                        <div key={label} className="py-1">{label}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
                    {gridDates.map(date => {
                        const isCurrentMonth = date.getMonth() === viewMonth.getMonth();
                        const isInCurrentWeek = weekDates.some(d => isSameDate(d, date));
                        const isTodayDate = isToday(date);

                        return (
                            <div
                                key={date.toISOString()}
                                className={isInCurrentWeek ? "bg-blue-50" : ""}
                            >
                                <button
                                    onClick={() => onSelectDate(date)}
                                    className={[
                                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full transition",
                                        isCurrentMonth ? "text-gray-800" : "text-gray-300",
                                        isTodayDate
                                            ? "bg-blue-600 font-semibold text-white"
                                            : "hover:bg-gray-200",
                                    ].join(" ")}
                                >
                                    {date.getDate()}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}