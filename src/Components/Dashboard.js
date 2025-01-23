import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaCheckCircle, FaSpinner, FaHourglassHalf, FaUser } from 'react-icons/fa';

function Dashboard({ completedTasksCount, inProgressTasksCount, pendingTasksCount }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <button
            onClick={() => navigate('/profile')}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 flex items-center"
          >
            <FaUser className="mr-2" />
            See Profile
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <FaCheckCircle className="text-green-600 text-5xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Tasks Completed</h2>
            <p className="mt-4 text-4xl font-bold text-green-600">{completedTasksCount}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <FaSpinner className="text-yellow-600 text-5xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Tasks In Progress</h2>
            <p className="mt-4 text-4xl font-bold text-yellow-600">{inProgressTasksCount}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <FaHourglassHalf className="text-red-600 text-5xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Tasks Pending</h2>
            <p className="mt-4 text-4xl font-bold text-red-600">{pendingTasksCount}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Link to="/tasks" className="block p-6 bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <h2 className="text-2xl font-semibold">See All Tasks</h2>
            <p className="mt-2">View and manage all your tasks.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;