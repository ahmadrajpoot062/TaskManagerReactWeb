import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Username:</p>
            <p className="text-lg font-semibold">{user.username}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">First Name:</p>
            <p className="text-lg font-semibold">{user.firstName}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Last Name:</p>
            <p className="text-lg font-semibold">{user.lastName}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Created On:</p>
            <p className="text-lg font-semibold">{new Date(user.createdOn).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;