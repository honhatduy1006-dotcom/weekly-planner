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
                    className="
                        h-20
                        cursor-pointer
                        border
                        border-gray-200
                        transition
                        duration-150
                        hover:bg-blue-50   
                    "
                ></div>
            ))}
        </div>
    );
}