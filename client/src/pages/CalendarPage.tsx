import { useState, useEffect, useCallback, useMemo } from "react";
import Navbar from "../components/Navbar/Navbar";
import MiniMonthSidebar from "../components/Navbar/MiniMonthSidebar";
import WeeklyCalendar from "../components/WeeklyCalendar/WeeklyCalendar";
import AddTaskModal from "../components/AddTaskModal/AddTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal/DeleteTaskModal";
import RequireAuthModal from "../components/RequireAuthModal";
import type { Task } from "../types/task";
import { getOverlappingTasks } from "../utils/task";
import ConflictTaskModal from "../components/ConflictTaskModal/ConflictTaskModal";
import { getMonday, addWeeks, getWeekDates, toISODate} from "../utils/date";
import { useAuth } from "../contexts/AuthContext";
import * as taskService from "../services/taskService";

export default function CalendarPage() {

    const { user } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    const [pendingTask, setPendingTask] = useState<Task | null>(null);
    const [conflicts, setConflicts] = useState<Task[]>([]);
    const [isConflictOpen, setIsConflictOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [createDraft, setCreateDraft] = useState<{
        date: string;
        startTime: string;
        endTime: string;
    } | null>(null);

    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getMonday(new Date()));
    const weekDates = useMemo(
        () => getWeekDates(currentWeekStart),
        [currentWeekStart]
    );;

    const goToPrevWeek = () => setCurrentWeekStart(prev => addWeeks(prev, -1));
    const goToNextWeek = () => setCurrentWeekStart(prev => addWeeks(prev, 1));
    const goToToday = () => setCurrentWeekStart(getMonday(new Date()));
    const goToDate = (date: Date) => setCurrentWeekStart(getMonday(date));
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    const loadTasks = useCallback(async () => {
        if (!user) {
            setTasks([]);
            return;
        }

        setIsLoading(true);
        try {
            const from = toISODate(weekDates[0]);
            const to = toISODate(weekDates[weekDates.length - 1]);
            const data = await taskService.fetchTasks(from, to);
            setTasks(data);
        } catch (err) {
            console.error('Không tải được danh sách task', err);
        } finally {
            setIsLoading(false);
        }
    }, [user, weekDates]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const requireAuth = (action: () => void) => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }
        action();
    };

    const saveTask = async (task: Task) => {
    const isExisting = tasks.some(t => t.id === task.id);

    if (isExisting) {
        const previousTasks = tasks;
        setTasks(prev => prev.map(t => (t.id === task.id ? task : t)));

        try {
            const updated = await taskService.updateTask(task.id, {
                title: task.title,
                description: task.description,
                date: task.date,
                startTime: task.startTime,
                endTime: task.endTime,
                color: task.color,
                completed: task.completed,
            });

            setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
        } catch (err) {
            console.error("Không lưu được task", err);

            setTasks(previousTasks);
        }
    } else {
        try {
            const created = await taskService.createTask({
                title: task.title,
                description: task.description,
                date: task.date,
                startTime: task.startTime,
                endTime: task.endTime,
                color: task.color,
                completed: task.completed,
            });

            setTasks(prev => [...prev, created]);
        } catch (err) {
            console.error("Không lưu được task", err);
        }
    }

    setSelectedTask(null);
    setCreateDraft(null);
    setIsModalOpen(false);
};

    const handleSaveTask = (task: Task) => {

        const overlapTasks = getOverlappingTasks(tasks, task);

        if (overlapTasks.length > 0) {
            setPendingTask(task);
            setConflicts(overlapTasks);
            setIsConflictOpen(true);
            return;
        }

        saveTask(task);

    };

    const handleAddAnyway = async () => {

        if (!pendingTask) return;

        await Promise.all(conflicts.map(c => taskService.deleteTask(c.id)));
        await saveTask(pendingTask);

        setPendingTask(null);
        setConflicts([]);
        setIsConflictOpen(false);
        setCreateDraft(null);
        setIsModalOpen(false);

    };

    const handleEditConflict = () => {
        setIsConflictOpen(false);
        setPendingTask(null);
        setConflicts([]);

    };

    const handleCancelConflict = () => {
        setPendingTask(null);
        setConflicts([]);
        setIsConflictOpen(false);

    };

    const handleRequestDelete = (task: Task) => {
        requireAuth(() => setTaskToDelete(task));
    };

    const handleConfirmDelete = async () => {
        if (!taskToDelete) return;

        try {
            await taskService.deleteTask(taskToDelete.id);
            setTasks(prev => prev.filter(task => task.id !== taskToDelete.id));
        } catch (err) {
            console.error('Không xóa được task', err);
        }
        
        setTaskToDelete(null);
    };

    const handleEditTask = (task: Task) => {
        requireAuth(() => {
            setSelectedTask(task);

            setIsModalOpen(true);
        });
    };

    const handleCreateTask = (
        date: string,
        startTime: string,
        endTime: string
    ) => {
        requireAuth(() => {
            setSelectedTask(null);
            setCreateDraft({ date, startTime, endTime });
            setIsModalOpen(true);
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar
                onAddTask={() =>
                    requireAuth(() => {
                        setSelectedTask(null);
                        setCreateDraft(null);
                        setIsModalOpen(true);
                    })
                }
                onToggleSidebar={toggleSidebar}
            />

            <div className="flex">
                <MiniMonthSidebar
                    isOpen={isSidebarOpen}
                    weekDates={weekDates}
                    onSelectDate={goToDate}
                />
                <div className="min-w-0 flex-1">
                    {isLoading && (
                        <div className="px-6 py-2 text-sm text-gray-400">
                            Đang tải task...
                        </div>
                    )}
                    <WeeklyCalendar 
                        tasks={tasks}
                        weekDates={weekDates}
                        onEdit={handleEditTask}
                        onDelete={handleRequestDelete}
                        onMove={handleSaveTask}
                        onCreateTask={handleCreateTask}
                        onPrevWeek={goToPrevWeek}
                        onNextWeek={goToNextWeek}
                        onToday={goToToday}
                    />
                </div>
            </div>

            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => {
                    setSelectedTask(null);
                    setIsModalOpen(false);
                    setCreateDraft(null);
                }}
                onSave={handleSaveTask}
                task={selectedTask}
                initialDraft={createDraft}
                weekDates={weekDates}
            />

            <DeleteTaskModal
                isOpen={taskToDelete !== null}
                task={taskToDelete}
                onCancel={() => setTaskToDelete(null)}
                onConfirm={handleConfirmDelete}
            />

            <ConflictTaskModal
                isOpen={isConflictOpen}
                newTask={pendingTask}
                conflicts={conflicts}
                onAddAnyway={handleAddAnyway}
                onEdit={handleEditConflict}
                onCancel={handleCancelConflict}
            />

            <RequireAuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </div>
    );
}