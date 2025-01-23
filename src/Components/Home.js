import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Welcome to Task Manager</h1>
        <p className="text-lg text-gray-700 mb-8">Manage your tasks efficiently and effectively with our intuitive task management system.</p>
        <Link to="/dashboard" className="inline-block px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Go to Dashboard
        </Link>
        <div className="mt-8">
          <p className="text-gray-600">Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-500 font-semibold">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Home;