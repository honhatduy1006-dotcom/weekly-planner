type TimeColumnProps = {
    hours: string[];
};

export default function TimeColumn({ hours }: TimeColumnProps) {
    return (
        <div>
            {hours.map((hour) => (
                <div
                    key={hour}
                    className="
                        flex items-center justify-center
                        h-20
                        border border-gray-200
                        bg-gray-50
                        text-sm font-medium text-gray-500
                    "
                >
                    {hour}
                </div>
            ))}
        </div>
    );
}