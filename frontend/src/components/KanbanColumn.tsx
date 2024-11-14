import React from 'react';

interface Task {
  id: string;
  name: string;
  title: string;
  email: string;
  mobile: string;
}

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-lg mb-4 border-2 border-white shadow-lg"
          >
            <p className="font-bold text-gray-800">{task.name}</p>
            <p className="text-gray-600">{task.title}</p>
            <p className="text-gray-500">{task.email}</p>
            <p className="text-gray-500">{task.mobile}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No tasks available</p>
      )}
    </div>
  );
};

export default KanbanColumn;
