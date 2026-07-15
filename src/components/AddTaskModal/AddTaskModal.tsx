type AddTaskModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AddTaskModal({
    isOpen,
    onClose,
}: AddTaskModalProps) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <div className="bg-white p-6 rounded-xl shadow-lg">

                <h2 className="text-xl font-bold mb-4">
                    Add Task
                </h2>

                <button
                    onClick={onClose}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>

            </div>

        </div>
    );
}