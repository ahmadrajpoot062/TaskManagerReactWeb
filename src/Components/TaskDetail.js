import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask } from '../Services/taskapi';

function TaskDetail({ setStatusUpdated }) {
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
    return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto mb-6 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ml-4"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mr-4"
        >
          Go To Dashboard
        </button>
      </div>
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{task.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{task.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Status:</p>
            <select
              value={task.status}
              onChange={handleStatusChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={0}>Pending</option>
              <option value={1}>In Progress</option>
              <option value={2}>Completed</option>
            </select>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Priority:</p>
            <p className="text-lg font-semibold">{task.priority}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Due Date:</p>
            <p className="text-lg font-semibold">{new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Progress:</p>
            <p className="text-lg font-semibold">{task.progress}%</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Created By:</p>
            <p className="text-lg font-semibold">{task.createdBy}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Created At:</p>
            <p className="text-lg font-semibold">{new Date(task.createdAt).toLocaleDateString()}</p>
          </div>
          {task.completedAt && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-600">Completed At:</p>
              <p className="text-lg font-semibold">{new Date(task.completedAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;