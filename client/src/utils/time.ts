export const HOUR_HEIGHT = 80;
export const START_HOUR = 0;
export const SNAP_INTERVAL_MINUTES = 15; 
export const MINUTE_HEIGHT = HOUR_HEIGHT / 60;
export const MINUTE_OPTIONS = ["00", "15", "30", "45"];

export function timeToMinutes(time: string): number {
    const [hour, minute] = time.split(":").map(Number);

    return hour * 60 + minute;
}

export function minutesToTime(minutes: number): string {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function getDurationInMinutes(start: string, end: string): number {
    return timeToMinutes(end) - timeToMinutes(start);
}

export function getTaskHeight(start: string, end: string): number {
    return (getDurationInMinutes(start, end) / 60) * HOUR_HEIGHT;
}

export function getTaskTop(startTime: string): number {
    return (
        (timeToMinutes(startTime) - START_HOUR * 60) /
        60 *
        HOUR_HEIGHT
    );
}

export function isValidTimeRange(start: string, end: string): boolean {
    return timeToMinutes(end) > timeToMinutes(start);
}

export function snapToInterval(
    top: number,
    intervalMinutes: number = SNAP_INTERVAL_MINUTES
): number {
    const intervalHeight = intervalMinutes * MINUTE_HEIGHT; 
    return Math.round(top / intervalHeight) * intervalHeight;
}

export function snapToHour(top: number): number {
    return Math.round(top / HOUR_HEIGHT) * HOUR_HEIGHT;

}

export function topToTime(top: number): string {
    const totalMinutes =
        START_HOUR * 60 +
        Math.round(top / MINUTE_HEIGHT);
    return minutesToTime(totalMinutes);

}

export function generateHourOptions(): string[] {
    const hours: string[] = [];
    for (let h = 0; h < 24; h++) {
        hours.push(String(h).padStart(2, "0"));
    }
    return hours;
}

export function splitTime(time: string): { hour: string; minute: string } {
    const [hour, minute] = time.split(":");
    return { hour, minute };
}

export function joinTime(hour: string, minute: string): string {
    return `${hour}:${minute}`;
}