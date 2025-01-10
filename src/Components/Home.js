import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Task Manager</h1>
        <p className="text-gray-700 mb-6">Manage your tasks efficiently and effectively with our intuitive task management system.</p>
        <Link to="/dashboard" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Go to Dashboard
        </Link>
        <div className="mt-6">
          <p className="text-gray-600">Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-500">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Home;