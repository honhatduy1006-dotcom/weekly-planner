type DayColumnProps = {
    day: string;
    hours: string[];
};

export default function DayColumn({
    hours,
}: DayColumnProps) {
    return (
        <div>
            {hours.map((hour) => (
                <div
                    key={hour}
                    className="h-16 border border-gray-300 hover:bg-blue-50 cursor-pointer transition-colors"
                ></div>
            ))}
        </div>
    );
}