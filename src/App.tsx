import { useState, useEffect } from 'react';
import InputTask from './InputTask.tsx'; 
import ShowTask from './ShowTask.tsx';  

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    function safeParse(key: string): string[] { 
      try {
        const item = localStorage.getItem(key);
        const parsed = item ? JSON.parse(item) : [];
        return Array.isArray(parsed) && parsed.every(i => typeof i === 'string') ? parsed : [];
      } catch {
        return [];
      }
    }
    setTasks(safeParse("tasks"));
    setCompletedTasks(safeParse("completedTasks"));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  function handleAddTask(newTask: string) {
    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  function markAsDone(index: number) {
    const newTasks = [...tasks];
    const doneTask = newTasks.splice(index, 1);
    if (doneTask[0]) { 
      setTasks(newTasks);
      setCompletedTasks(prevCompleted => [...prevCompleted, doneTask[0]]);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-6 px-8 flex justify-between items-center bg-indigo-950 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">
          tuto<span className="text-yellow-400">DO</span>
        </h1>
        <button
          className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-bold px-6 py-2 rounded-lg shadow transition"
          onClick={() => {
            setTasks([]);
            setCompletedTasks([]);
            localStorage.removeItem("tasks");
            localStorage.removeItem("completedTasks");
          }}
        >
          Clear All
        </button>
      </header>

      <div className="flex-1 flex flex-col items-start justify-start px-0 py-0">
        <div className="w-full max-w-xl mx-auto mt-16">
          <h2 className="text-4xl font-black text-black mb-8">Things to get done</h2>
          <div>
            <h3 className="text-xl font-bold text-black mb-4">Things to do</h3>
            <ShowTask tasks={tasks} onDone={markAsDone} />
            <div className="mt-6">
              <InputTask onAdd={handleAddTask} />
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-bold text-black mb-4">Things done</h3>
            <ShowTask tasks={completedTasks} isCompleted={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
