type ShowTaskProps = {
  tasks: string[];                
  isCompleted?: boolean;        
  onDone?: (index: number) => void; 
};

export default function ShowTask({ tasks = [], isCompleted, onDone }: ShowTaskProps) {
  return (
    <div className="task-list flex flex-col gap-2">
      {tasks.length === 0 && (
        <p className="text-gray-400 italic">No tasks here!</p>
      )}
      {tasks.map((task: string, index: number) => (
        <label
          key={index}
          className="flex items-center gap-3 bg-gray-800/80 p-3 rounded-lg"
        >
          <input
            type="checkbox"
            checked={!!isCompleted}
            readOnly
            className="accent-yellow-400 w-5 h-5"
            onClick={() => {
              if (!isCompleted && onDone) onDone(index);
            }}
            style={{ cursor: isCompleted ? "default" : "pointer" }}
          />
          <span
            className={
              "text-lg " +
              (isCompleted
                ? "text-gray-400 line-through"
                : "text-white")
            }
          >
            {task}
          </span>
        </label>
      ))}
    </div>
  );
}
