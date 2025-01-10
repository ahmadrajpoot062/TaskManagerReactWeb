const BASE_URL = "https://localhost:7253/api/User"; // Replace with your API base URL

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
    if (!response.ok) throw new Error('Failed to create user');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get all users
export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get a user by ID
export const getUserById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
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
    if (!response.ok) throw new Error('Failed to update user');
    if (response.status === 204) return; // No content to return
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get a user by username
export const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/username/${username}`);
    if (!response.ok) throw new Error(`Failed to fetch user with username: ${username}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};