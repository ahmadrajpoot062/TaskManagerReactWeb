const BASE_URL = "https://localhost:7253/api/Task"; // Replace with your API base URL

// Utility function to handle errors and responses
const handleResponse = async (response) => {
  if (!response.ok) {
    // Log detailed error based on the response status
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText || 'Unknown error'}`);
  }
  return response.json();
};

// Create a new task
export const createTask = async (task) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error in createTask:', error);
    throw new Error(`Failed to create task: ${error.message}`);
  }
};

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error in getTasks:', error);
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
};

// Get tasks by username
export const getTasksByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/username/${username}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error in getTasksByUsername for user ${username}:`, error);
    throw new Error(`Failed to fetch tasks for user ${username}: ${error.message}`);
  }
};

// Get a task by ID
export const getTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error in getTask for task ID ${id}:`, error);
    throw new Error(`Failed to fetch task with ID ${id}: ${error.message}`);
  }
};

// Update a task by ID
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    // Handle empty responses (204 No Content)
    if (response.status === 204) return null;

    return await handleResponse(response);
  } catch (error) {
    console.error(`Error in updateTask for task ID ${id}:`, error);
    throw new Error(`Failed to update task with ID ${id}: ${error.message}`);
  }
};

// Delete a task by ID
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      return null; // No content to return
    }

    return await handleResponse(response);
  } catch (error) {
    console.error(`Error in deleteTask for task ID ${id}:`, error);
    throw new Error(`Failed to delete task with ID ${id}: ${error.message}`);
  }
};
