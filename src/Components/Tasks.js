import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTasks, FaPlus, FaFilter, FaCheckCircle, FaSpinner, FaHourglassHalf, FaEdit, FaTrash } from 'react-icons/fa';
import { deleteTask } from '../Services/taskapi';
import { updateTask } from '../Services/taskapi';
import DeleteDialog from './DeleteDailog';
import UpdateTask from './UpdateTask';
import { toast } from 'react-toastify';
function Tasks({ tasks,setTaskDeleted}) {
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();
    const [editingTask, setEditingTask] = useState(null);
    const [deletingTask, setDeletingTask] = useState(null);
  
  
    const handleEditClick = (task) => {
      setEditingTask(task);
    };
  
    const handleDeleteClick = (task) => {
      setDeletingTask(task);
    };
  
  
    const handleConfirmDelete = async () => {
      try {
        await deleteTask(deletingTask.id);
        toast.success("task deleted Successfully");
        setTaskDeleted(prev => !prev);
        setDeletingTask(null);
      } catch (error) {
        alert('Failed to delete task.');
        console.error('Error deleting task:', error);
      }
    };
  
    const handleUpdateTask = async (id, updatedTask) => {
      try {
        await updateTask(id, updatedTask);
        toast.info("Task Updated Successfully!");
        setTaskDeleted(prev => !prev);
        setEditingTask(null);
      } catch (error) {
        alert('Failed to update task.');
        console.error('Error updating task:', error);
      }
    };
  
  

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
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-white flex items-center">
            <FaTasks className="mr-2" />
            All Tasks
          </h1>
          <Link to="/create-task" className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 flex items-center">
            <FaPlus className="mr-2" />
            Create Task
          </Link>
        </div>
        <div className="flex justify-center items-center mb-6">
          <label htmlFor="statusFilter" className="mr-2 text-white text-lg font-bold flex items-center">
            <FaFilter className="mr-2" />
            Filter by status:
          </label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={handleFilterChange}
            className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg font-bold"
          >
            <option value="all">All</option>
            <option value="0">Pending</option>
            <option value="1">In Progress</option>
            <option value="2">Completed</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-600">No tasks available</p>
          ) : (
            filteredTasks.map((task, index) => (
              <div key={task.id} className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${colors[index % colors.length]}`}>
                <Link to={`/task/${task.id}`} className="block">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{task.title}</h2>
                  <p className="text-gray-600 mb-4">{task.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-medium ${task.status === 0 ? 'text-yellow-500' : task.status === 1 ? 'text-blue-500' : 'text-green-500'}`}>
                      {task.status === 0 ? 'Pending' : task.status === 1 ? 'In Progress' : 'Completed'}
                    </span>
                    <span className="text-sm text-gray-500">Priority: {task.priority}</span>
                  </div>
                  <p className="text-sm text-gray-500">Creation Date: {new Date(task.createdAt).toLocaleDateString()}</p>
                </Link>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(task)}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 flex items-center"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {editingTask && (
          <UpdateTask
            task={editingTask}
            onUpdate={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
          />
        )}
        {deletingTask && (
          <DeleteDialog
            onDelete={handleConfirmDelete}
            onCancel={() => setDeletingTask(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Tasks;