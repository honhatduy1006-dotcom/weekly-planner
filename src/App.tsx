import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import WeeklyCalendar from "./components/WeeklyCalendar/WeeklyCalendar";
import AddTaskModal from "./components/AddTaskModal/AddTaskModal";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar
                onAddTask={() => setIsModalOpen(true)}/>

            <WeeklyCalendar />
            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default App;