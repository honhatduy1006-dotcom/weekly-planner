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
  { length: 23 },
  (_, i) => `${String(i + 0).padStart(2, "0")}:00`
);