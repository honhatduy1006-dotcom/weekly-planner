export const DAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export const HOURS = Array.from(
  { length: 17 },
  (_, i) => `${String(i + 6).padStart(2, "0")}:00`
);