export default function Navbar() {
  return (
    <header className="border-b p-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="text-2xl font-bold">
          Weekly Planner
        </h1>

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          + Add Task
        </button>
      </div>
    </header>
  );
}