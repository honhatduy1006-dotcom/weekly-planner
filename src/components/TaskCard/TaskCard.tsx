import type { Task } from "../../types/task";

type TaskCardProps = {
    task: Task;
    duration: number;
    top:number;
};

export default function TaskCard({ 
    task,
    duration,
    top,
 }: TaskCardProps) {
    return (
        <div
            style={{
                top,
                height: `${duration * 80}px`,
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
            <h3 className="font-semibold text-lg">
                {task.title}
            </h3>

            {task.description && (
                <p className="mt-1 text-sm opacity-90">
                    {task.description}
                </p>
            )}

            <div className="mt-2 text-xs font-medium opacity-90">
                {task.startTime} - {task.endTime}
            </div>
        </div>
    );
}