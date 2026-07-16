import type { Task } from "../../types/task";

type DeleteTaskModalProps = {
    isOpen: boolean;
    task: Task | null;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function DeleteTaskModal({
    isOpen,
    task,
    onCancel,
    onConfirm,
}: DeleteTaskModalProps) {

    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-[420px] rounded-xl bg-white p-6 shadow-xl">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">

                        <span className="text-2xl">🗑</span>

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-red-600">
                            Delete Task
                        </h2>

                        <p className="text-sm text-gray-500">
                            This action cannot be undone.
                        </p>

                    </div>

                </div>

                <p className="mt-5 text-gray-700">
                    Are you sure you want to permanently delete this task?
                </p>

                <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">

                    <h3 className="text-lg font-bold text-gray-800">
                        {task.title}
                    </h3>

                    {task.description && (
                        <p className="mt-2 text-sm text-gray-600">
                            {task.description}
                        </p>
                    )}

                    <div className="mt-4 space-y-2 text-sm">

                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                                Day
                            </span>

                            <span>{task.day}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                                Time
                            </span>

                            <span>
                                {task.startTime} - {task.endTime}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                                Status
                            </span>

                            <span
                                className={`font-semibold ${
                                    task.completed
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                }`}
                            >
                                {task.completed
                                    ? "Completed"
                                    : "In Progress"}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">

                            <span className="font-medium text-gray-500">
                                Color
                            </span>

                            <div
                                className={`
                                    w-5
                                    h-5
                                    rounded-full
                                    ${task.color}
                                `}
                            />

                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                                Created
                            </span>

                            <span>
                                {new Date(task.createdAt).toLocaleString()}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                                Updated
                            </span>

                            <span>
                                {new Date(task.updatedAt).toLocaleString()}
                            </span>
                        </div>

                    </div>

                </div>

                <p className="mt-4 text-sm text-gray-500">
                    This action cannot be undone.
                </p>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="
                            rounded-lg
                            bg-gray-200
                            px-5
                            py-2
                            hover:bg-gray-300
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="
                            rounded-lg
                            bg-red-600
                            px-5
                            py-2
                            font-medium
                            text-white
                            transition
                            hover:bg-red-700
                        "
                    >
                        Delete Task
                    </button>

                </div>

            </div>

        </div>
    );
}