type CalendarHeaderProps = {
    days: string[];
};

export default function CalendarHeader({ days }: CalendarHeaderProps) {
    return (
        <div
            className="
                grid
                grid-cols-[90px_repeat(7,minmax(0,1fr))]
                bg-gray-50
            "
        >
            <div className="border border-gray-200 py-4 text-center font-semibold text-gray-700">
                Time
            </div>

            {days.map((day) => (
                <div
                    key={day}
                    className="border border-gray-200 py-4 text-center font-semibold text-gray-700"
                >
                    {day}
                </div>
            ))}
        </div>
    );
}