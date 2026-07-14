type TimeColumnProps = {
    hours: string[];
};

export default function TimeColumn({ hours }: TimeColumnProps) {
    return (
        <div>
            {hours.map((hour) => (
                <div
                    key={hour}
                    className="h-16 border border-gray-300 flex items-center justify-center text-sm bg-gray-50"
                >
                    {hour}
                </div>
            ))}
        </div>
    );
}