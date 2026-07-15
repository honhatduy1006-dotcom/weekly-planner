export default function Navbar() {
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
                    className="
                        rounded-lg
                        bg-blue-600
                        px-5
                        py-2
                        font-medium
                        text-white
                        transition
                        hover:bg-blue-700
                    "
                >
                    + Add Task
                </button>
            </div>
        </header>
    );
}