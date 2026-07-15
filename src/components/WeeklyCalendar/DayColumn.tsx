import type { Task } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";

type DayColumnProps = {
    day: string;
    hours: string[];
    tasks: Task[];
};

export default function DayColumn({
    day,
    hours,
    tasks,
}: DayColumnProps) {

    const dayTasks = tasks.filter(
        task => task.day === day
    );

    return (

        <div className="relative">

            {/* Grid Layer */}

            {hours.map(hour => (

                <div
                    key={hour}
                    className="
                        h-20
                        border
                        border-gray-200
                        hover:bg-blue-50
                        transition
                    "
                />

            ))}

            {/* Event Layer */}

            <div className="absolute inset-0">

                {dayTasks.map(task => {

                    const start =
                        Number(task.startTime.split(":")[0]);

                    const end =
                        Number(task.endTime.split(":")[0]);

                    const duration = end - start;

                    const top = (start - 6) * 80;

                    return (

                        <TaskCard
                            key={task.id}
                            task={task}
                            duration={duration}
                            top={top}
                        />

                    );

                })}

            </div>

        </div>

    );
}