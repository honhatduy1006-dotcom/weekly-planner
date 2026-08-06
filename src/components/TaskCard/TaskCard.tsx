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
    top: number;
    onEdit(task: Task): void;
    onDelete(task: Task): void;
    onMove: (task: Task) => void;
    getDayFromClientX: (clientX: number) => string | null;
    minTop: number;
    maxTop: number;
};

export default function TaskCard({
    task,
    top,
    onEdit,
    onDelete,
    onMove,
    getDayFromClientX,
    minTop,
    maxTop,
}: TaskCardProps) {
    const [dragging, setDragging] = useState(false);
    const [offsetY, setOffsetY] = useState(0);
    const [offsetX, setOffsetX] = useState(0);

    const startYRef = useRef(0);
    const startXRef = useRef(0);
    const offsetYRef = useRef(0);
    const didDragRef = useRef(false);

    const taskHeight = getTaskHeight(task.startTime, task.endTime);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        startYRef.current = e.clientY;
        startXRef.current = e.clientX;
        didDragRef.current = false;
    };

    useEffect(() => {
        if (!dragging) return;

        const DRAG_THRESHOLD = 5;

        const handleMouseMove = (e: MouseEvent) => {
            const deltaY = e.clientY - startYRef.current;
            const deltaX = e.clientX - startXRef.current;

            if (Math.abs(deltaY) > DRAG_THRESHOLD || Math.abs(deltaX) > DRAG_THRESHOLD) {
                didDragRef.current = true;
            }

            const rawTop = top + deltaY;
            const clampedTop = Math.max(
                minTop,
                Math.min(rawTop, maxTop - taskHeight)
            );
            const clampedDeltaY = clampedTop - top;

            offsetYRef.current = clampedDeltaY;
            setOffsetY(clampedDeltaY);
            setOffsetX(deltaX)
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (didDragRef.current) {
                const rawTop = top + offsetYRef.current;
                const snappedTop = snapToHour(rawTop);

                const clampedSnappedTop = Math.max(
                    minTop,
                    Math.min(snappedTop, maxTop - taskHeight)
                );

                const newStart = topToTime(snappedTop);
                const duration = getDurationInMinutes(task.startTime, task.endTime);
                const newEnd = minutesToTime(timeToMinutes(newStart) + duration);

                const newDay = getDayFromClientX(e.clientX) ?? task.day;

                onMove({
                    ...task,
                    day: newDay,
                    startTime: newStart,
                    endTime: newEnd,
                    updatedAt: new Date(),
                });
            }

            setOffsetY(0);
            setOffsetX(0);
            offsetYRef.current = 0;
            setDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging]);

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
                top, // cố định theo prop, không đổi khi đang kéo
                height: `${getTaskHeight(task.startTime, task.endTime)}px`,
                cursor: dragging ? "grabbing" : "grab",
                transform: `translate(${offsetX}px, ${offsetY}px) scale(${dragging ? 1.02 : 1})`,
                opacity: dragging ? 0.9 : 1,
                userSelect: dragging ? "none" : "auto",
                willChange: dragging ? "transform" : "auto",
            }}
            className={`
                absolute
                left-1
                right-1
                ${task.color}
                rounded-lg
                shadow-md
                hover:shadow-xl
                ${dragging ? "" : "transition"}
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
            <h3 className="font-semibold text-sm leading-5 truncate">
                {task.title}
            </h3>

            {task.description && (
                <p className="mt-1 text-xs leading-4 opacity-90 line-clamp-2">
                    {task.description}
                </p>
            )}

            <div className="mt-2 text-[11px] leading-4 font-medium opacity-80">
                {task.startTime} - {task.endTime}
            </div>

            <span
                className={`
                    mt-2 inline-block rounded-full px-2 py-1 text-[10px] font-semibold
                    ${task.completed ? "bg-green-600 text-white" : "bg-yellow-500 text-white"}
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
                    className="rounded p-1 hover:bg-white/20"
                >
                    🗑
                </button>
            </div>
        </div>
    );
}