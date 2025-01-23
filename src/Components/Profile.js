import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaCalendarAlt, FaUserTag } from 'react-icons/fa';

function Profile({ user,handleLogout }) {
  const navigate = useNavigate();


  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <FaUser className="mr-2" />
            Profile
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 flex items-center"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <FaUserTag className="text-gray-600 text-2xl mr-4" />
            <div>
              <p className="text-gray-600">Username:</p>
              <p className="text-lg font-semibold">{user.username}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <FaUser className="text-gray-600 text-2xl mr-4" />
            <div>
              <p className="text-gray-600">First Name:</p>
              <p className="text-lg font-semibold">{user.firstName}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <FaUser className="text-gray-600 text-2xl mr-4" />
            <div>
              <p className="text-gray-600">Last Name:</p>
              <p className="text-lg font-semibold">{user.lastName}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <FaCalendarAlt className="text-gray-600 text-2xl mr-4" />
            <div>
              <p className="text-gray-600">Created On:</p>
              <p className="text-lg font-semibold">{new Date(user.createdOn).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;