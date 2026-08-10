import type { Task } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";
import {
    getTaskTop,
    HOUR_HEIGHT,
    MINUTE_HEIGHT,
    snapToInterval,
    topToTime,
} from "../../utils/time";
import { useLayoutEffect, useRef, useState } from "react";

type DayColumnProps = {
    date: string;
    hours: string[];
    tasks: Task[];
    onEdit: (task: Task) => void;
    onMove: (task: Task) => void;
    onDelete: (task: Task) => void;
    onCreateTask: (day: string, startTime: string, endTime: string) => void;
    registerColumn: (day: string, rect: DOMRect) => void;
    getDateFromClientX: (clientX: number) => string | null;
};

const DEFAULT_CREATE_DURATION_MINUTES = 60; 

export default function DayColumn({
    date,
    hours,
    tasks,
    onEdit,
    onDelete,
    onMove,
    onCreateTask,
    registerColumn,
    getDateFromClientX,
    
}: DayColumnProps) {

    const dayTasks =
        tasks.filter(
            task => task.date === date
        );

    const columnRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
            if (!columnRef.current) return;
            registerColumn(
                date,
                columnRef.current.getBoundingClientRect()
            );

        }, [date]);

    const minTop = 0;
    const maxTop = hours.length * HOUR_HEIGHT;

    const [creating, setCreating] = useState(false);
    const [createStart, setCreateStart] = useState(0);
    const [createEnd, setCreateEnd] = useState(0);

    const createStartRef = useRef(0);
    const didCreateDragRef = useRef(false);

    const handleGridMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!gridRef.current) return;

        const rect = gridRef.current.getBoundingClientRect();
        const relY = Math.max(minTop, Math.min(e.clientY - rect.top, maxTop));

        createStartRef.current = relY;
        didCreateDragRef.current = false;
        setCreateStart(relY);
        setCreateEnd(relY);
        setCreating(true);
    };

    useLayoutEffect(() => {
        if (!creating) return;

        const DRAG_THRESHOLD = 5;

        const handleMouseMove = (e: MouseEvent) => {
            if (!gridRef.current) return;

            const rect = gridRef.current.getBoundingClientRect();
            const relY = Math.max(minTop, Math.min(e.clientY - rect.top, maxTop));

            if (Math.abs(relY - createStartRef.current) > DRAG_THRESHOLD) {
                didCreateDragRef.current = true;
            }

            setCreateEnd(relY);
        };

        const handleMouseUp = () => {
            const rawTop1 = Math.min(createStartRef.current, createEnd);
            const rawTop2 = Math.max(createStartRef.current, createEnd);

            const snappedTop1 = snapToInterval(rawTop1);
            let snappedTop2 = snapToInterval(rawTop2);

            // Nếu chỉ click (không kéo đủ xa) -> tạo task mặc định 1 tiếng từ điểm click
            if (!didCreateDragRef.current) {
                snappedTop2 = snappedTop1 + DEFAULT_CREATE_DURATION_MINUTES * MINUTE_HEIGHT;
            }

            // Đảm bảo không vượt quá đáy lưới, và có độ dài tối thiểu (15 phút)
            const clampedTop2 = Math.min(snappedTop2, maxTop);
            const minDuration = 15 * MINUTE_HEIGHT;
            const finalTop2 = clampedTop2 - snappedTop1 >= minDuration
                ? clampedTop2
                : Math.min(snappedTop1 + minDuration, maxTop);
            const finalTop1 = finalTop2 - snappedTop1 >= minDuration
                ? snappedTop1
                : finalTop2 - minDuration;

            const startTime = topToTime(finalTop1);
            const endTime = topToTime(finalTop2);

            onCreateTask(date, startTime, endTime);

            setCreating(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [creating, createEnd, date]);

    const previewTop = Math.min(createStart, createEnd);
    const previewHeight = Math.abs(createEnd - createStart);

    return (
        <div ref={columnRef} className="relative">

            {/* Grid Layer - vùng nhận sự kiện tạo task mới */}
            <div
                ref={gridRef}
                onMouseDown={handleGridMouseDown}
            >
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
            </div>

            {/* Preview khi đang kéo tạo task */}
            {creating && (
                <div
                    className="
                        absolute
                        left-1
                        right-1
                        rounded-lg
                        border-2
                        border-dashed
                        border-blue-500
                        bg-blue-200/50
                        pointer-events-none
                        z-30
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-medium
                        text-blue-700
                    "
                    style={{
                        top: previewTop,
                        height: Math.max(previewHeight, 4),
                    }}
                >
                    {topToTime(snapToInterval(Math.min(createStart, createEnd)))}
                    {" - "}
                    {topToTime(snapToInterval(Math.max(createStart, createEnd)))}
                </div>
            )}

            {/* Event Layer */}
            <div className="absolute inset-0 pointer-events-none">
                {dayTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        top={getTaskTop(task.startTime)}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onMove={onMove}
                        getDateFromClientX={getDateFromClientX}
                        minTop={minTop}
                        maxTop={maxTop}
                    />
                ))}
            </div>

        </div>
    );
}