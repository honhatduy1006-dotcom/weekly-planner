import { useEffect, useState } from "react";
import { DAYS, HOURS } from "../../data/calendar";
import type { Task } from "../../types/task";
import { isValidTimeRange } from "../../utils/time";

type AddTaskModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: Task) => void;
    task?: Task | null;
};

export default function AddTaskModal({
    isOpen,
    onClose,
    onSave,
    task,
}: AddTaskModalProps) {
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [day, setDay] = useState("Mon");

    const [startTime, setStartTime] = useState("08:00");

    const [endTime, setEndTime] = useState("09:00");

    const [color, setColor] = useState("bg-blue-500");

    const [completed, setCompleted] = useState(false);

    const [errors, setErrors] = useState({
        title: "",
        startTime: "",
        endTime: "",
    });

    useEffect(() => {

        if (task) {

            setTitle(task.title);
            setDescription(task.description ?? "");
            setDay(task.day);
            setStartTime(task.startTime);
            setEndTime(task.endTime);
            setColor(task.color);

            setCompleted(task.completed);

        } else {

            setTitle("");
            setDescription("");
            setDay("Mon");
            setStartTime("08:00");
            setEndTime("09:00");
            setColor("bg-blue-500");

            setCompleted(false);

        }

    }, [task, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {

    const newErrors = {
        title: "",
        startTime: "",
        endTime: "",
    };

    if (!title.trim()) {
        newErrors.title = "Title is required";
    }

    if (!isValidTimeRange(startTime, endTime)) {
        newErrors.endTime =
            "End time must be after start time";
    }

    setErrors(newErrors);

    if (
        newErrors.title ||
        newErrors.endTime
    ) {
        return;
    }

    const newTask: Task = {
        id: task?.id ?? crypto.randomUUID(),

        title,
        description,
        day,
        startTime,
        endTime,
        color,

        completed,

        createdAt: task?.createdAt ?? new Date(),
        updatedAt: new Date(),
    };

    onSave(newTask);

};

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 py-8">

            <div className="
                    bg-white
                    w-full
                    max-w-xl
                    rounded-2xl
                    shadow-2xl
                    p-8
                    max-h-[90vh]
                    overflow-y-auto
            ">

                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    {task ? "Edit Task" : "Add New Task"}
                </h2>

                {/* Title */}
                <div className="mb-6">
                    <label className="
                                block
                                mb-2
                                text-sm
                                font-semibold
                                text-gray-700">
                        Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Study React..."
                        className="
                            w-full
                            rounded-lg
                            border
                            border-gray-300
                            px-4
                            py-3
                            text-gray-700
                            shadow-sm
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-200
                            focus:outline-none
                        "
                    />

                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.title}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="
                                block
                                mb-2
                                text-sm
                                font-semibold
                                text-gray-700">
                        Description
                    </label>

                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="
                            w-full
                            rounded-lg
                            border
                            border-gray-300
                            px-4
                            py-3
                            resize-none
                            shadow-sm
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-200
                            focus:outline-none
                        "
                    />
                </div>

                {/* Day */}
                <div className="mb-6">
                    <label className="
                                block
                                mb-2
                                text-sm
                                font-semibold
                                text-gray-700">
                        Day
                    </label>

                    <select
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        className="
                            w-full
                            rounded-lg
                            border
                            border-gray-300
                            px-4
                            py-3
                            resize-none
                            shadow-sm
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-200
                            focus:outline-none
                        "
                    >
                        {DAYS.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Time */}
                <div className="grid grid-cols-2 gap-4 mb-4">

                    <div>
                        <label className="
                                    block
                                    mb-2
                                    text-sm
                                    font-semibold
                                    text-gray-700">
                            Start Time
                        </label>

                        <select
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="
                                w-full
                                rounded-lg
                                border
                                border-gray-300
                                px-4
                                py-3
                                resize-none
                                shadow-sm
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-200
                                focus:outline-none
                            "
                        >
                            {HOURS.map((hour) => (
                                <option key={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="
                                    block
                                    mb-2
                                    text-sm
                                    font-semibold
                                    text-gray-700">
                            End Time
                        </label>

                        <select
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="
                                w-full
                                rounded-lg
                                border
                                border-gray-300
                                px-4
                                py-3
                                resize-none
                                shadow-sm
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-200
                                focus:outline-none
                            "
                        >
                            {HOURS.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>

                        {errors.endTime && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.endTime}
                            </p>
                        )}
                    </div>

                </div>

                {/* Color */}
                <div className="mb-6">

                    <label className="
                                block
                                mb-2
                                text-sm
                                font-semibold
                                text-gray-700">
                        Color
                    </label>

                    <div className="flex gap-4 mt-3">

                        {[
                            "bg-blue-500",
                            "bg-green-500",
                            "bg-red-500",
                            "bg-yellow-500",
                            "bg-purple-500",
                        ].map((c) => (

                            <button
                                key={c}
                                type="button"
                                onClick={() => setColor(c)}
                                className={`
                                    w-10
                                    h-10
                                    rounded-full
                                    transition
                                    hover:scale-110
                                    ${c}
                                    ${
                                        color === c
                                            ? "ring-4 ring-gray-400"
                                            : ""
                                    }
                                `}
                            />

                        ))}

                    </div>

                </div>

                {task && (

                <div className="mb-6">

                    <label
                        className="
                            block
                            mb-2
                            text-sm
                            font-semibold
                            text-gray-700
                        "
                    >
                        Status
                    </label>

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={(e) =>
                                setCompleted(e.target.checked)
                            }
                            className="
                                w-5
                                h-5
                                accent-blue-600
                            "
                        />

                        <span className="text-gray-700">

                            {completed
                                ? "Completed"
                                : "In Progress"}

                        </span>

                    </label>

                </div>

                )}

                {/* Footer */}
                <div className="
                        mt-8
                        flex
                        justify-end
                        gap-4
                        border-t
                        pt-6"
                    >

                    <button
                        onClick={onClose}
                        className="
                            px-6
                            
                            py-2.5

                            rounded-lg

                            bg-gray-100

                            font-medium

                            hover:bg-gray-200

                            transition
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-6
                            py-2.5
                            rounded-lg
                            font-medium
                            transition
                            shadow-sm
                            hover:shadow-md
                        "
                    >
                        {task ? "Update" : "Save"}
                    </button>

                </div>

            </div>

        </div>
    );
}