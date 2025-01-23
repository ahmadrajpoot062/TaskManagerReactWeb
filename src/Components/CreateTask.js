import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../Services/taskapi';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

function CreateTask({setTaskCreated}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = localStorage.getItem("username");
    const taskData = {
      ...formData,
      status: 0, // Set status to 0 (Pending) by default
      createdAt: new Date().toISOString(), // Set the current date and time
      progress: 0, // Set progress to 0 by default
      completedAt: null, // Set completedAt to null by default
      createdBy: name, // Use the actual username from localStorage
    };
    try {
      await createTask(taskData);
      toast.success("Task Created Successfully");
      setTaskCreated(prev=>!prev);
      navigate('/tasks'); // Redirect to the tasks page
    } catch (error) {
      alert('Failed to create task.');
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Task</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
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
              placeholder="Description"
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
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaPlus className="mr-2" />
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;