import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface Task {
  id: string;
  name: string;
  title: string;
  age: string;
  email: string;
  mobile: string;
}

interface TaskPopupProps {
  task: Task;
  statuses: string[];
  onUpdate: (task: Task, newStatus: string) => void;
  onDelete: (taskId: string) => void;
  onClose: () => void;
}

const TaskPopup: React.FC<TaskPopupProps> = ({
  task,
  statuses,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const [formData, setFormData] = useState(task);
  const [newStatus, setNewStatus] = useState(task.title); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-1/3 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        {/* Input fields */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Name"
        />

        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
        />

        {/* Dropdown */}
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onUpdate(formData, newStatus)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
