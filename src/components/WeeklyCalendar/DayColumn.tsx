import type { Task } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";
import { getTaskTop } from "../../utils/time";
import { useLayoutEffect, useRef } from "react";

type DayColumnProps = {
    day: string;
    hours: string[];
    tasks: Task[];
    onEdit: (task: Task) => void;
    onMove: (task: Task) => void;
    onDelete: (task: Task) => void;
    registerColumn: (
        day: string,
        rect: DOMRect
    ) => void;
    getDayFromClientX: (
        clientX: number
    ) => string | null;
};

export default function DayColumn({
    day,
    hours,
    tasks,
    onEdit,
    onDelete,
    onMove,
    registerColumn,
    getDayFromClientX,
    
}: DayColumnProps) {

    const dayTasks =
        tasks.filter(
            task => task.day === day
        );

    const columnRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {

            if (!columnRef.current) return;

            registerColumn(
                day,
                columnRef.current.getBoundingClientRect()
            );

        }, [day]);

    return (

        <div
            ref={columnRef} 
            className="relative">

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
                            onMove={onMove}
                            getDayFromClientX={getDayFromClientX}
                        />

                    );

                })}

            </div>

        </div>

    );
}