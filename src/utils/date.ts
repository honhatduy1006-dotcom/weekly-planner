import { DAYS } from "../data/calendar";

const JS_DAY_TO_INDEX = [6, 0, 1, 2, 3, 4, 5];

export function getMonday(date: Date): Date {
    const result = new Date(date);
    const diff = JS_DAY_TO_INDEX[result.getDay()];
    result.setDate(result.getDate() - diff);
    result.setHours(0, 0, 0, 0);
    return result;
}

export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function addWeeks(date: Date, weeks: number): Date {
    return addDays(date, weeks * 7);
}

export function getWeekDates(weekStart: Date): Date[] {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

export function getWeekdayKey(date: Date): string {
    return DAYS[JS_DAY_TO_INDEX[date.getDay()]];
}

export function toISODate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export function fromISODate(iso: string): Date {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
}

export function isSameDate(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function isToday(date: Date): boolean {
    return isSameDate(date, new Date());
}

const MONTH_NAMES_VI = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
    "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
    "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

export function formatMonthYear(date: Date): string {
    return `${MONTH_NAMES_VI[date.getMonth()]}, ${date.getFullYear()}`;
}

export function formatMonthYearRange(weekDates: Date[]): string {
    const first = weekDates[0];
    const last = weekDates[weekDates.length - 1];

    if (first.getMonth() === last.getMonth() && first.getFullYear() === last.getFullYear()) {
        return formatMonthYear(first);
    }

    if (first.getFullYear() === last.getFullYear()) {
        return `${MONTH_NAMES_VI[first.getMonth()]} - ${MONTH_NAMES_VI[last.getMonth()]}, ${first.getFullYear()}`;
    }

    return `${formatMonthYear(first)} - ${formatMonthYear(last)}`;
}

export function formatDayNumber(date: Date): string {
    return String(date.getDate());
}

export function formatFullDate(date: Date): string {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    return `${d}/${m}/${date.getFullYear()}`;
}