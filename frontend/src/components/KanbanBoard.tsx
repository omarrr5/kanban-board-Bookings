import React from "react";

interface Task {
  id: string;
  name: string;
  title: string;
  age: string;
  email: string;
  mobile: string;
}

interface KanbanBoardProps {
  tasks: {
    unclaimed: Task[];
    firstContact: Task[];
    preparingWorkOffer: Task[];
    sendToTherapist: Task[];
  };
  onTaskClick: (task: Task) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskClick }) => {
  const formatStatusName = (status: string) => {
    return status
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {Object.keys(tasks).map((status) => (
        <div key={status} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-l font-semibold">
              {formatStatusName(status)}
            </h2>
            <span className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full">
              {tasks[status as keyof typeof tasks].length}
            </span>
          </div>

          <ul className="max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {tasks[status as keyof typeof tasks].map((task) => (
              <li
                key={task.id}
                className="mt-2 p-4 border rounded cursor-pointer"
                onClick={() => onTaskClick(task)}
              >
                <div className="flex items-center mb-2">
                  <p className="font-bold mr-10">{task.name}</p>
                  <p className="font-normal text-sm">{task.age} yo</p>
                </div>

                <p className="text-sm text-gray-700 mb-2">{task.mobile}</p>
                <p className="text-sm text-gray-700 mb-2 break-words">
                  {task.email}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
