import { useNavigate } from 'react-router-dom';
import { LogIn, X } from 'lucide-react';

interface RequireAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequireAuthModal({ isOpen, onClose }: RequireAuthModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <LogIn size={22} />
          </div>
        </div>

        <h2 className="mb-2 text-center text-lg font-semibold text-gray-900">
          Cần đăng nhập
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Bạn cần đăng nhập để thêm, sửa hoặc xóa công việc trong lịch.
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate('/login')}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Đăng nhập
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Tạo tài khoản mới
          </button>
        </div>
      </div>
    </div>
  );
}