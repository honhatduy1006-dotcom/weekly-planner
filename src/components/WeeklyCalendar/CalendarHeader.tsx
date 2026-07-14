type CalendarHeaderProps = {
    days: string[];
};

export default function CalendarHeader({ days }: CalendarHeaderProps) {
    return (
        <div className="grid grid-cols-8 bg-gray-100">
            <div className="border border-gray-300 p-3 text-center font-bold">
                Time
            </div>

            {days.map((day) => (
                <div
                    key={day}
                    className="border border-gray-300 p-3 text-center font-bold"
                >
                    {day}
                </div>
            ))}
        </div>
    );
}