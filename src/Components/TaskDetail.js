import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSpinner, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import { getTask, updateTask } from '../Services/taskapi';

function TaskDetail({setStatusUpdated}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await getTask(id);
        setTask(fetchedTask);
      } catch (error) {
        setError('Failed to fetch task.');
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = parseInt(e.target.value);
    try {
      const updatedTask = { ...task, status: newStatus };
      await updateTask(id, updatedTask);
      setTask(updatedTask);
      setStatusUpdated(prev => !prev); // Toggle the statusUpdated state to trigger useEffect
    } catch (error) {
      console.error('Error updating task status:', error);
      setError('Failed to update task status.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        <FaSpinner className="animate-spin text-4xl" />
        <span className="ml-4 text-xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Task Detail</h1>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{task.title}</h2>
          <p className="text-gray-600 mb-4">{task.description}</p>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${task.status === 0 ? 'text-yellow-500' : task.status === 1 ? 'text-blue-500' : 'text-green-500'}`}>
              {task.status === 0 ? <FaHourglassHalf className="mr-1" /> : task.status === 1 ? <FaSpinner className="mr-1" /> : <FaCheckCircle className="mr-1" />}
              {task.status === 0 ? 'Pending' : task.status === 1 ? 'In Progress' : 'Completed'}
            </span>
            <span className="text-sm text-gray-500">Priority: {task.priority}</span>
          </div>
          <p className="text-sm text-gray-500">Creation Date: {new Date(task.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Change Status</label>
          <select
            id="status"
            value={task.status}
            onChange={handleStatusChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="0">Pending</option>
            <option value="1">In Progress</option>
            <option value="2">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;