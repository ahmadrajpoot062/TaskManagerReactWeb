import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaCalendarAlt, FaUserTag, FaEnvelope, FaIdBadge } from 'react-icons/fa';

function AdminProfile({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
            Admin Profile
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 flex items-center"
          >
            <FaIdBadge className="mr-2" />
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center">
            <FaUserTag className="text-gray-600 text-2xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Username</h2>
              <p className="mt-2 text-gray-600">{user.username}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center">
            <FaUser className="text-gray-600 text-2xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">First Name</h2>
              <p className="mt-2 text-gray-600">{user.firstName}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center">
            <FaUser className="text-gray-600 text-2xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Last Name</h2>
              <p className="mt-2 text-gray-600">{user.lastName}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center">
            <FaCalendarAlt className="text-gray-600 text-2xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Created On</h2>
              <p className="mt-2 text-gray-600">{new Date(user.createdOn).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center">
            <FaEnvelope className="text-gray-600 text-2xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Email</h2>
              <p className="mt-2 text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;