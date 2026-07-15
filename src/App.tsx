import Navbar from "./components/Navbar/Navbar";
import WeeklyCalendar from "./components/WeeklyCalendar/WeeklyCalendar";

function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <WeeklyCalendar />
        </div>
    );
}

export default App;