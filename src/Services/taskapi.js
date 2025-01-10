const BASE_URL = "https://localhost:7253/api/Task"; // Replace with your API base URL

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
    if (!response.ok) throw new Error('Failed to create task');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get tasks by username
export const getTasksByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/username/${username}`);
    if (!response.ok) throw new Error(`Failed to fetch tasks for user: ${username}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get a task by ID
export const getTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch task');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
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
    if (!response.ok) throw new Error('Failed to update task');
    if (response.status === 204) return; // No content to return
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a task by ID
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};