const BASE_URL = "https://localhost:7253/api/User"; // Replace with your API base URL

// Utility function to handle errors and responses
const handleResponse = async (response) => {
  if (!response.ok) {
    // Log detailed error based on the response status and body
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText || 'Unknown error'}`);
  }
  return response.json();
};

// Create a new user
export const createUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error in createUser:', error);
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

// Get all users
export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error in getUsers:', error);
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

// Get a user by ID
export const getUserById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error in getUserById for user ID ${id}:`, error);
    throw new Error(`Failed to fetch user with ID ${id}: ${error.message}`);
  }
};

// Update a user by ID
export const updateUser = async (id, updatedUser) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    // Handle empty responses (204 No Content)
    if (response.status === 204) return null;

    return await handleResponse(response);
  } catch (error) {
    console.error(`Error in updateUser for user ID ${id}:`, error);
    throw new Error(`Failed to update user with ID ${id}: ${error.message}`);
  }
};

// Delete a user by ID
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      return null; // No content to return
    }

    return await handleResponse(response);
  } catch (error) {
    console.error(`Error in deleteUser for user ID ${id}:`, error);
    throw new Error(`Failed to delete user with ID ${id}: ${error.message}`);
  }
};

// Get a user by username
export const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/username/${username}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error in getUserByUsername for username ${username}:`, error);
    throw new Error(`Failed to fetch user with username ${username}: ${error.message}`);
  }
};
