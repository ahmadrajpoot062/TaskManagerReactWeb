import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard({ completedTasksCount, inProgressTasksCount, pendingTasksCount }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => navigate('/profile')}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            See Profile
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Tasks Completed</h2>
            <p className="mt-2 text-3xl font-bold text-green-600">{completedTasksCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Tasks In Progress</h2>
            <p className="mt-2 text-3xl font-bold text-yellow-600">{inProgressTasksCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Tasks Pending</h2>
            <p className="mt-2 text-3xl font-bold text-red-600">{pendingTasksCount}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Link to="/tasks" className="block p-6 bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold">See All Tasks</h2>
            <p className="mt-2">View and manage all your tasks.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;