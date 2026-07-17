import type { Task } from "../../types/task";
import { getTaskHeight } from "../../utils/time";
import { useEffect, useState, useRef } from "react";
import { snapToHour } from "../../utils/time";
import { topToTime } from "../../utils/time";
import { getDurationInMinutes } from "../../utils/time";
import { minutesToTime } from "../../utils/time";
import { timeToMinutes } from "../../utils/time";
type TaskCardProps = {
    task: Task;
    top:number;
    onEdit(task: Task): void;
    onDelete(task: Task): void;
    onMove: (task: Task) => void;
};

export default function TaskCard({ 
    task,
    top,
    onEdit,
    onDelete,
    onMove,
 }: TaskCardProps) {

    const [dragging, setDragging] = useState(false);

    const [dragTop, setDragTop] = useState(top);

    const [startY, setStartY] = useState(0);

    const [startTop, setStartTop] = useState(top);

    const dragTopRef = useRef(top);
    const didDragRef = useRef(false);

    useEffect(() => {
        setDragTop(top);
        dragTopRef.current = top;
    }, [top]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        setStartY(e.clientY);
        setStartTop(dragTop);
        didDragRef.current = false;
    };

    useEffect(() => {
        if (!dragging) return;

        const DRAG_THRESHOLD = 5;

        const handleMouseMove = (e: MouseEvent) => {
            const delta = e.clientY - startY;

            if (Math.abs(delta) > DRAG_THRESHOLD) {
                didDragRef.current = true;
            }

            const newTop = startTop + delta;
            setDragTop(newTop);
            dragTopRef.current = newTop;
        };

        const handleMouseUp = () => {
            if (didDragRef.current) {
                const snappedTop = snapToHour(dragTopRef.current);
                setDragTop(snappedTop);
                dragTopRef.current = snappedTop;

                const newStart = topToTime(snappedTop);
                const duration = getDurationInMinutes(task.startTime, task.endTime);
                const newEnd = minutesToTime(timeToMinutes(newStart) + duration);

                onMove({
                    ...task,
                    startTime: newStart,
                    endTime: newEnd,
                    updatedAt: new Date(),
                });
            } else {
                setDragTop(startTop);
                dragTopRef.current = startTop;
            }

            setDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, startY, startTop]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (didDragRef.current) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        onEdit(task);
    };

    return (
        <div
            onClick={handleClick}
            onMouseDown={handleMouseDown}

            style={{
                top: dragTop,
                height: `${getTaskHeight(task.startTime, task.endTime)}px`,
                cursor: dragging ? "grabbing" : "grab",
                transform: dragging ? "scale(1.02)" : "scale(1)",
                opacity: dragging ? 0.9 : 1,
                userSelect: dragging ? "none" : "auto",
            }}
            className={`
                absolute
                left-1
                right-1
                ${task.color}
                rounded-lg
                shadow-md
                hover:shadow-xl
                transition
                text-white
                flex
                flex-col
                justify-center
                items-center
                px-3
                text-center
                z-20
            `}
        >
            <h3 className="
                    font-semibold
                    text-sm
                    leading-5
                    truncate
            ">
                {task.title}
            </h3>

            {task.description && (
                <p className="
                    mt-1
                    text-xs
                    leading-4
                    opacity-90
                    line-clamp-2
                ">
                    {task.description}
                </p>
            )}

            <div className="
                    mt-2
                    text-[11px]
                    leading-4
                    font-medium
                    opacity-80
            ">
                {task.startTime} - {task.endTime}
            </div>

            <span
                className={`
                    mt-2
                    inline-block
                    rounded-full
                    px-2
                    py-1
                    text-[10px]
                    font-semibold
                    ${
                        task.completed
                            ? "bg-green-600 text-white"
                            : "bg-yellow-500 text-white"
                    }
                `}
            >
                {task.completed ? "Completed" : "In Progress"}
            </span>

            <div className="absolute top-2 right-2">

                <button

                    onClick={(e) => {

                        e.stopPropagation();

                        onDelete(task);

                    }}

                    className="
                        rounded
                        p-1
                        hover:bg-white/20
                    "
                >
                    🗑
                </button>

            </div>
        </div>
    );
}