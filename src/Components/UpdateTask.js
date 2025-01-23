import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

function UpdateTask({ task, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    id:0,
    title: '',
    description: '',
    status: 0,
    createdAt: '',
    dueDate: '',
    completedAt: null,
    progress: 0,
    priority: 'Low',
    createdBy: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        id:task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt.split('T')[0], // Format date to yyyy-MM-dd
        dueDate: task.dueDate.split('T')[0], // Format date to yyyy-MM-dd
        completedAt: task.completedAt ? task.completedAt.split('T')[0] : null, // Format date to yyyy-MM-dd if not null
        progress: task.progress,
        priority: task.priority,
        createdBy: task.createdBy,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(task.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Task</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              id="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
              
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTask;