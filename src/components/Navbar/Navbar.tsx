type NavbarProps = {
    onAddTask: () => void;
};

export default function Navbar({
    onAddTask,
}: NavbarProps) {
    return (
        <header className="bg-white border-b shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Weekly Planner
                    </h1>

                    <p className="text-sm text-gray-500">
                        Organize your week efficiently
                    </p>
                </div>

                <button
                    onClick={onAddTask}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add Task
                </button>
            </div>
        </header>
    );
}