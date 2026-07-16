import type { Task } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";
import { getTaskTop } from "../../utils/time";

type DayColumnProps = {
    day: string;
    hours: string[];
    tasks: Task[];
    onEdit: (task: Task) => void;

    onDelete: (task: Task) => void;
};

export default function DayColumn({
    day,
    hours,
    tasks,
    onEdit,
    onDelete,
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

                    return (

                        <TaskCard
                            key={task.id}
                            task={task}
                            top={getTaskTop(task.startTime)}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />

                    );

                })}

            </div>

        </div>

    );
}