import type { Task } from "../../types/task";
import { useEffect, useState, useRef } from "react";
import { 
    getTaskHeight,
    snapToInterval,
    topToTime,
    getDurationInMinutes,
    minutesToTime,
    timeToMinutes,
    MINUTE_HEIGHT, } from "../../utils/time";


const MIN_DURATION_MINUTES = 15;
const MIN_DURATION_HEIGHT = MIN_DURATION_MINUTES * MINUTE_HEIGHT;

type TaskCardProps = {
    task: Task;
    top: number;
    onEdit(task: Task): void;
    onDelete(task: Task): void;
    onMove: (task: Task) => void;
    getDateFromClientX: (clientX: number) => string | null;
    minTop: number;
    maxTop: number;
};

type ResizeEdge = "top" | "bottom" | null;

export default function TaskCard({
    task,
    top,
    onEdit,
    onDelete,
    onMove,
    getDateFromClientX,
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

    const [resizeEdge, setResizeEdge] = useState<ResizeEdge>(null);
    const [previewTop, setPreviewTop] = useState(top);
    const [previewHeight, setPreviewHeight] = useState(taskHeight);

    const resizeStartYRef = useRef(0);
    const resizeBaseTopRef = useRef(top);
    const resizeBaseHeightRef = useRef(taskHeight);

    useEffect(() => {
        setPreviewTop(top);
        setPreviewHeight(taskHeight);
    }, [top, taskHeight]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        setDragging(true);
        startYRef.current = e.clientY;
        startXRef.current = e.clientX;
        didDragRef.current = false;
    };

    useEffect(() => {
        if (!dragging) return;

        const DRAG_THRESHOLD = 5;

        const handlePointerMove = (e: PointerEvent) => {
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

        const handlePointerUp = (e: PointerEvent) => {
            if (didDragRef.current) {
                const rawTop = top + offsetYRef.current;
                const snappedTop = snapToInterval(rawTop);

                const newStart = topToTime(snappedTop);
                const duration = getDurationInMinutes(task.startTime, task.endTime);
                const newEnd = minutesToTime(timeToMinutes(newStart) + duration);

                const newDate = getDateFromClientX(e.clientX) ?? task.date;

                onMove({
                    ...task,
                    date: newDate,
                    startTime: newStart,
                    endTime: newEnd,
                    updatedAt: new Date().toISOString(),
                });
            }

            setOffsetY(0);
            setOffsetX(0);
            offsetYRef.current = 0;
            setDragging(false);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
        window.addEventListener("pointercancel", handlePointerUp);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
            window.removeEventListener("pointercancel", handlePointerUp);
        };
    }, [dragging]);

    const handleResizePointerDown = (edge: ResizeEdge) => (e: React.PointerEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setResizeEdge(edge);
        resizeStartYRef.current = e.clientY;
        resizeBaseTopRef.current = top;
        resizeBaseHeightRef.current = taskHeight;
        didDragRef.current = false;
    };

    useEffect(() => {
        if (!resizeEdge) return;

        const DRAG_THRESHOLD = 5;

        const handlePointerMove = (e: PointerEvent) => {
            const delta = e.clientY - resizeStartYRef.current;

            if (Math.abs(delta) > DRAG_THRESHOLD) {
                didDragRef.current = true;
            }

            const baseTop = resizeBaseTopRef.current;
            const baseHeight = resizeBaseHeightRef.current;
            const baseBottom = baseTop + baseHeight;

            if (resizeEdge === "top") {
                const rawTop = baseTop + delta;
                const clampedTop = Math.max(
                    minTop,
                    Math.min(rawTop, baseBottom - MIN_DURATION_HEIGHT)
                );
                setPreviewTop(clampedTop);
                setPreviewHeight(baseBottom - clampedTop);
            } else {
                const rawBottom = baseBottom + delta;
                const clampedBottom = Math.min(
                    maxTop,
                    Math.max(rawBottom, baseTop + MIN_DURATION_HEIGHT)
                );
                setPreviewTop(baseTop);
                setPreviewHeight(clampedBottom - baseTop);
            }
        };

        const handlePointerUp = () => {
            if (didDragRef.current) {
                if (resizeEdge === "top") {
                    const snappedTop = snapToInterval(previewTop);
                    const clampedTop = Math.max(
                        minTop,
                        Math.min(snappedTop, resizeBaseTopRef.current + resizeBaseHeightRef.current - MIN_DURATION_HEIGHT)
                    );

                    const newStart = topToTime(clampedTop);

                    onMove({
                        ...task,
                        startTime: newStart,
                        endTime: task.endTime,
                        updatedAt: new Date().toISOString(),
                    });
                } else {
                    const previewBottom = previewTop + previewHeight;
                    const snappedBottom = snapToInterval(previewBottom);
                    const clampedBottom = Math.min(
                        maxTop,
                        Math.max(snappedBottom, resizeBaseTopRef.current + MIN_DURATION_HEIGHT)
                    );

                    const newEnd = topToTime(clampedBottom);

                    onMove({
                        ...task,
                        startTime: task.startTime,
                        endTime: newEnd,
                        updatedAt: new Date().toISOString()
                    });
                }
            } else {
                // Không đủ threshold để coi là kéo -> reset về vị trí gốc
                setPreviewTop(top);
                setPreviewHeight(taskHeight);
            }

            setResizeEdge(null);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
        window.addEventListener("pointercancel", handlePointerUp);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
            window.removeEventListener("pointercancel", handlePointerUp);
        };
    }, [resizeEdge, previewTop, previewHeight]);

    const handleClick = (e: React.PointerEvent<HTMLDivElement>) => {
        if (didDragRef.current) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        onEdit(task);
    };

    const isInteracting = dragging || resizeEdge !== null;

    const showDescription = taskHeight >= 100 && !!task.description;
    const showBadge = taskHeight >= 60;
    const showTime = taskHeight >= 40;
    const isVeryCompact = taskHeight < 60;

    return (
        <div
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            style={{
                top: resizeEdge ? previewTop : top,
                height: `${resizeEdge ? previewHeight : taskHeight}px`,
                cursor: dragging ? "grabbing" : "grab",
                transform: resizeEdge
                    ? "none"
                    : `translate(${offsetX}px, ${offsetY}px) scale(${dragging ? 1.02 : 1})`,
                opacity: dragging ? 0.9 : 1,
                userSelect: dragging ? "none" : "auto",
                willChange: dragging ? "transform" : "auto",
            }}
            className={`
                group
                absolute
                left-1
                right-1
                overflow-hidden
                pointer-events-auto
                ${task.color}
                rounded-lg
                shadow-md
                hover:shadow-xl
                ${isInteracting ? "" : "transition"}
                text-white
                flex
                flex-col
                ${isVeryCompact ? "justify-center" : "justify-start"}
                items-center
                px-3
                ${isVeryCompact ? "py-0.5" : "py-2"}
                text-center
                z-20
            `}
        >
            <div
                onPointerDown={handleResizePointerDown("top")}
                className="
                    absolute
                    top-0
                    left-0
                    right-0
                    h-2
                    cursor-ns-resize
                    z-30
                    flex
                    justify-center
                "
            >
                <div className="
                    w-8
                    h-1
                    mt-0.5
                    rounded-full
                    bg-white/0
                    group-hover:bg-white/60
                    transition
                " />
            </div>

            <h3 className={`
                font-semibold
                truncate
                w-full
                ${isVeryCompact ? "text-xs leading-4" : "text-sm leading-5"}
            `}>
                {task.title}
            </h3>

            {showDescription && (
                <p className="
                    mt-1
                    text-xs
                    leading-4
                    opacity-90
                    line-clamp-2
                    w-full
                ">
                    {task.description}
                </p>
            )}

            {showTime && (
                <div className={`
                    text-[11px]
                    leading-4
                    font-medium
                    opacity-80
                    ${isVeryCompact ? "mt-0" : "mt-2"}
                `}>
                    {task.startTime} - {task.endTime}
                </div>
            )}

            {showBadge && (
                <span
                    className={`
                        mt-1
                        inline-block
                        rounded-full
                        px-2
                        py-0.5
                        text-[10px]
                        font-semibold
                        ${task.completed ? "bg-green-600 text-white" : "bg-yellow-500 text-white"}
                    `}
                >
                    {task.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
                </span>
            )}

            <div className="absolute top-1 right-1">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task);
                    }}
                    className="
                        rounded
                        p-0.5
                        hover:bg-white/20
                        text-xs
                    "
                >
                    🗑
                </button>
            </div>

             <div
                onPointerDown={handleResizePointerDown("bottom")}
                className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-2
                    cursor-ns-resize
                    z-30
                    flex
                    justify-center
                "
            >
                <div className="
                    w-8
                    h-1
                    mb-0.5
                    rounded-full
                    bg-white/0
                    group-hover:bg-white/60
                    transition
                " />
            </div>
        </div>
    );
}