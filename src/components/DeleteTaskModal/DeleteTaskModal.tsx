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
                            Xóa Task
                        </h2>

                    </div>

                </div>

                <p className="mt-5 text-gray-700">
                    Bro muốn xóa task này hả? Bro đã xong chưa đấy?
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
                                Ngày
                            </span>

                            <span>{task.day}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                                Thời gian
                            </span>

                            <span>
                                {task.startTime} - {task.endTime}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                                Tình trạng
                            </span>

                            <span
                                className={`font-semibold ${
                                    task.completed
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                }`}
                            >
                                {task.completed
                                    ? "Đã hoàn thành"
                                    : "Chưa hoàn thành"}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">

                            <span className="font-medium text-gray-500">
                                Màu sắc
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
                                Tạo lúc
                            </span>

                            <span>
                                {new Date(task.createdAt).toLocaleString()}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                                Cập nhật lúc
                            </span>

                            <span>
                                {new Date(task.updatedAt).toLocaleString()}
                            </span>
                        </div>

                    </div>

                </div>

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
                        Hủy bỏ
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
                        Xóa Task
                    </button>

                </div>

            </div>

        </div>
    );
}