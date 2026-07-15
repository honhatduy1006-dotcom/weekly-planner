import { useState } from "react";
import { DAYS, HOURS } from "../../data/calendar";

type AddTaskModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AddTaskModal({
    isOpen,
    onClose,
}: AddTaskModalProps) {
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [day, setDay] = useState("Mon");

    const [startTime, setStartTime] = useState("08:00");

    const [endTime, setEndTime] = useState("09:00");

    const [color, setColor] = useState("bg-blue-500");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[500px] rounded-xl shadow-xl p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Add New Task
                </h2>

                {/* Title */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">
                        Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Study React..."
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">
                        Description
                    </label>

                    <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Day */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">
                        Day
                    </label>

                    <select
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
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
                        <label className="block font-medium mb-2">
                            Start Time
                        </label>

                        <select
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            {HOURS.map((hour) => (
                                <option key={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            End Time
                        </label>

                        <select
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            {HOURS.map((hour) => (
                                <option key={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* Color */}
                <div className="mb-6">

                    <label className="block font-medium mb-2">
                        Color
                    </label>

                    <div className="flex gap-3">

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
                                    w-8
                                    h-8
                                    rounded-full
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

                {/* Footer */}
                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save
                    </button>

                </div>

            </div>

        </div>
    );
}