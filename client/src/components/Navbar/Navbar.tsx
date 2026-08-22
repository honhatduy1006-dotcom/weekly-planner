type NavbarProps = {
    onAddTask: () => void;
    onToggleSidebar: () => void;
};

export default function Navbar({
    onAddTask,
    onToggleSidebar,
}: NavbarProps) {
    return (
        <header className="bg-white border-b shadow-sm">
            <div className="flex w-full items-center justify-between px-6 py-5">
                <div className="flex items-center gap-3 min-w-0">
                    <button
                        onClick={onToggleSidebar}
                        aria-label="Mở/đóng lịch tháng"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M2 5H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M2 10H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M2 15H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Weekly Planner
                        </h1>

                        <p className="text-sm text-gray-500">
                            Giúp bạn lập lịch làm việc hiệu quả hơn, hoặc không:)
                        </p>
                    </div>
                </div>

                <button
                    onClick={onAddTask}
                    className="shrink-0 whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                    + Thêm Task
                </button>
            </div>
        </header>
    );
}

