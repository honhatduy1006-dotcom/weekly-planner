import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import WeeklyCalendar from "./components/WeeklyCalendar/WeeklyCalendar";
import AddTaskModal from "./components/AddTaskModal/AddTaskModal";
import DeleteTaskModal from "./components/DeleteTaskModal/DeleteTaskModal";
import { tasks as mockTasks } from "./data/tasks";
import type { Task } from "./types/task";
import { getOverlappingTasks } from "./utils/task";
import ConflictTaskModal from "./components/ConflictTaskModal/ConflictTaskModal";
import { getMonday, addWeeks, getWeekDates } from "./utils/date";

function App() {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    const [pendingTask, setPendingTask] = useState<Task | null>(null);

    const [conflicts, setConflicts] = useState<Task[]>([]);

    const [isConflictOpen, setIsConflictOpen] = useState(false);

    const [createDraft, setCreateDraft] = useState<{
        day: string;
        startTime: string;
        endTime: string;
    } | null>(null);

    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getMonday(new Date()));
    const weekDates = getWeekDates(currentWeekStart);

    const goToPrevWeek = () => setCurrentWeekStart(prev => addWeeks(prev, -1));
    const goToNextWeek = () => setCurrentWeekStart(prev => addWeeks(prev, 1));
    const goToToday = () => setCurrentWeekStart(getMonday(new Date()));

    const saveTask = (task: Task) => {

        setTasks(prev => {

            const exists =
                prev.some(t => t.id === task.id);

            if (exists) {

                return prev.map(t =>
                    t.id === task.id
                        ? task
                        : t
                );

            }

            return [...prev, task];

        });

        setSelectedTask(null);

        setCreateDraft(null);

        setIsModalOpen(false);

    };

    const handleSaveTask = (task: Task) => {

        const overlapTasks =
            getOverlappingTasks(tasks, task);

        if (overlapTasks.length > 0) {

            setPendingTask(task);

            setConflicts(overlapTasks);

            setIsConflictOpen(true);

            return;
        }

        saveTask(task);

    };

    const handleAddAnyway = () => {

        if (!pendingTask) return;

        setTasks(prev => {

            // Xóa tất cả task bị conflict
            const remain = prev.filter(
                t => !conflicts.some(c => c.id === t.id)
            );

            // Thêm task mới
            return [...remain, pendingTask];
        });

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
        setTaskToDelete(task);
    };

    const handleConfirmDelete = () => {

        if (!taskToDelete) return;

        setTasks(prev =>
            prev.filter(task => task.id !== taskToDelete.id)
        );

        setTaskToDelete(null);
    };

    const handleEditTask = (task: Task) => {

        setSelectedTask(task);

        setIsModalOpen(true);

    };

    const handleCreateTask = (
        day: string,
        startTime: string,
        endTime: string
    ) => {

        setSelectedTask(null);

        setCreateDraft({ day, startTime, endTime });

        setIsModalOpen(true);

    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar
                onAddTask={() => {
                    setSelectedTask(null);
                    setCreateDraft(null);
                    setIsModalOpen(true);
                }}
            />

            <WeeklyCalendar 
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleRequestDelete}
                onMove={handleSaveTask}
                onCreateTask={handleCreateTask}
            />

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
        </div>
    );
}

export default App;