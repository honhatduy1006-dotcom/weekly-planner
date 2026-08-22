import type { Task } from "../../types/task";

type ConflictTaskModalProps = {
    isOpen: boolean;
    newTask: Task | null;
    conflicts: Task[];

    onAddAnyway: () => void;
    onEdit: () => void;
    onCancel: () => void;
};

export default function ConflictTaskModal({
    isOpen,
    newTask,
    conflicts,
    onAddAnyway,
    onEdit,
    onCancel,
}: ConflictTaskModalProps) {

    if (!isOpen || !newTask) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="bg-white rounded-2xl p-8 w-[600px] shadow-2xl">

                <h2 className="text-2xl font-bold text-orange-600">
                    ⚠ Trùng Task
                </h2>

                <p className="mt-3 text-gray-600">
                    Task bạn vừa thêm bị trùng rùi đóa
                </p>

                <div className="mt-6">

                    <h3 className="font-semibold">
                        Task mới
                    </h3>

                    <div className="mt-2 rounded-lg border p-4">

                        <p className="font-bold">
                            {newTask.title}
                        </p>

                        <p>
                            {newTask.day}
                        </p>

                        <p>
                            {newTask.startTime} - {newTask.endTime}
                        </p>

                    </div>

                </div>

                <div className="mt-6">

                    <h3 className="font-semibold">
                        Task bị trùng
                    </h3>

                    <div className="space-y-3 mt-3">

                        {conflicts.map(task => (

                            <div
                                key={task.id}
                                className="rounded-lg border p-4"
                            >

                                <p className="font-bold">
                                    {task.title}
                                </p>

                                <p>
                                    {task.day}
                                </p>

                                <p>
                                    {task.startTime} - {task.endTime}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="px-5 py-2 rounded bg-gray-200"
                    >
                        Hủy bỏ
                    </button>

                    <button
                        onClick={onEdit}
                        className="px-5 py-2 rounded bg-yellow-500 text-white"
                    >
                        Sửa Task mới
                    </button>

                    <button
                        onClick={onAddAnyway}
                        className="px-5 py-2 rounded bg-red-600 text-white"
                    >
                        Kệ lưu luôn
                    </button>

                </div>

            </div>

        </div>
    );
}