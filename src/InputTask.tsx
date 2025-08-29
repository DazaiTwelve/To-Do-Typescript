import { useState } from "react";
import React from "react";

type InputTaskProps = {
  onAdd: (task: string) => void;
};

export default function InputTask({ onAdd }: InputTaskProps) {
  const [task, setTask] = useState<string>("");

  function handleAdd() {
    if (task.trim()) {
      onAdd(task);
      setTask("");
    }
  }

  return (
    <div className="input-container mt-2">
      <input
        type="text"
        className="p-2 border rounded mr-2"
        placeholder="Add a new task"
        value={task}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTask(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            handleAdd();
          }
        }}
      />
      <button
        className='rounded shadow shadow-lg hover:bg-green-500 bg-green-400 px-4 py-2'
        onClick={handleAdd}
      >
        Add Task
      </button>
    </div>
  );
}