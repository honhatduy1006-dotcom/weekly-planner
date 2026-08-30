import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type NavbarProps = {
    onAddTask: () => void;
    onToggleSidebar: () => void;
};

export default function Navbar({
    onAddTask,
    onToggleSidebar,
}: NavbarProps) {
    const { user, logout } = useAuth();
    return (

        <header className="bg-white border-b shadow-sm">
            <div className="flex w-full flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
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

                    <div className="min-w-0">
                        <h1 className="truncate text-xl font-bold text-gray-800 sm:text-3xl">
                            Weekly Planner
                        </h1>

                        <p className="hidden text-sm text-gray-500 sm:block">
                            Giúp bạn lập lịch làm việc hiệu quả hơn, hoặc không:)
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center justify-end gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                                    {(user.name || user.email).charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden text-sm font-medium text-gray-700 sm:inline">
                                    {user.name || user.email}
                                </span>
                            </div>
                            <button
                                onClick={logout}
                                className="whitespace-nowrap rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Đăng xuất
                            </button>
                        </div>
                        ) : (
                            <Link
                                to="/login"
                                className="whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Đăng nhập
                            </Link>
                        )}

                    <button
                        onClick={onAddTask}
                        className="shrink-0 whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                        + Thêm Task
                    </button>
                </div>
            </div>
        </header>
    );
}

