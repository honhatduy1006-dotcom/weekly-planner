export const HOUR_HEIGHT = 80;
export const START_HOUR = 6;

export function timeToMinutes(time: string): number {
    const [hour, minute] = time.split(":").map(Number);

    return hour * 60 + minute;
}

export function minutesToTime(minutes: number): string {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function getDurationInMinutes(
    start: string,
    end: string
): number {
    return timeToMinutes(end) - timeToMinutes(start);
}

export function getTaskHeight(
    start: string,
    end: string
): number {
    return (getDurationInMinutes(start, end) / 60) * HOUR_HEIGHT;
}

export function getTaskTop(startTime: string): number {
    return (
        (timeToMinutes(startTime) - START_HOUR * 60) /
        60 *
        HOUR_HEIGHT
    );
}

export function isValidTimeRange(
    start: string,
    end: string
): boolean {
    return timeToMinutes(end) > timeToMinutes(start);
}

