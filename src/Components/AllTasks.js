import React, { useState } from 'react';
import { FaTasks, FaFilter } from 'react-icons/fa';

function AllTasks({ tasks }) {
  const [filterStatus, setFilterStatus] = useState('all');

  const colors = [
    'bg-red-100', 'bg-fuchsia-200', 'bg-green-100', 'bg-blue-100', 'bg-yellow-100', 'bg-purple-100',
    'bg-pink-100', 'bg-indigo-100', 'bg-teal-100', 'bg-orange-100', 'bg-lime-100',
    'bg-cyan-100', 'bg-amber-100', 'bg-fuchsia-100', 'bg-rose-100', 'bg-violet-100',
    'bg-sky-100', 'bg-stone-100', 'bg-gray-100', 'bg-emerald-100', 'bg-slate-100',
    'bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-yellow-200', 'bg-purple-200',
    'bg-pink-200', 'bg-indigo-200', 'bg-teal-200', 'bg-orange-200', 'bg-lime-200',
    'bg-cyan-200', 'bg-amber-200', 'bg-fuchsia-200', 'bg-rose-200', 'bg-violet-200'
  ];

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'all') return true;
    return task.status === parseInt(filterStatus);
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center">
            <FaTasks className="mr-2" />
            All Tasks
          </h1>
          <div className="flex items-center">
            <FaFilter className="text-white text-2xl mr-2" />
            <select
              value={filterStatus}
              onChange={handleFilterChange}
              className="px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All</option>
              <option value="0">Pending</option>
              <option value="1">In Progress</option>
              <option value="2">Completed</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-200">No tasks available</p>
          ) : (
            filteredTasks.map((task, index) => (
              <div key={task.id} className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${colors[index % colors.length]}`}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{task.title}</h2>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${task.status === 0 ? 'text-yellow-500' : task.status === 1 ? 'text-blue-500' : 'text-green-500'}`}>
                    {task.status === 0 ? 'Pending' : task.status === 1 ? 'In Progress' : 'Completed'}
                  </span>
                  <span className="text-sm text-gray-500">Priority: {task.priority}</span>
                </div>
                <p className="text-sm text-gray-500">Creation Date: {new Date(task.createdAt).toLocaleDateString()}</p>
                <span className="text-sm text-gray-500">Creadted by: {task.createdBy}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllTasks;