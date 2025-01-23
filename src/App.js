import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import CreateTask from './Components/CreateTask';
import Tasks from './Components/Tasks';
import TaskDetail from './Components/TaskDetail';
import Profile from './Components/Profile'; // Import Profile component
import { useState, useEffect } from 'react';
import { getTasksByUsername } from './Services/taskapi';
import { getUserByUsername } from './Services/userapi'; // Import getUserByUsername
import { getTasks } from './Services/taskapi';
import { useNavigate } from 'react-router-dom';
import api from './Services/api';
import AdminDashboard from './Components/AdminDashBoard';
import AllTasks from './Components/AllTasks';
import AdminProfile from './Components/AdminProfile';
import { ToastContainer,toast } from 'react-toastify';

function App() {
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskCreated, setTaskCreated] = useState(false);
  const [statusUpdated, setStatusUpdated] = useState(false);
  const [user, setUser] = useState(null); // State to store user details
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  //admin usernames are here and in the ProtectedRoutes 
  const adminUsernames = ['safee@admin'];
  const [taskDeleted,setTaskDeleted]=useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/Auth/login', formData);
      const token = response.data.token;
      const username = formData.username;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      toast.success("Login Successful");
      setUsername(username);
      if (adminUsernames.includes(username)) {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const name = localStorage.getItem("username");
      try {
        const fetchedTasks =
          name === 'safee@admin'
            ? await getTasks()
            : await getTasksByUsername(name);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]); // Reset tasks to an empty array on error
      }
    };

    fetchTasks();
  }, [username, taskCreated, statusUpdated, user, taskDeleted]);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const name = localStorage.getItem("username");
        const fetchedUser = await getUserByUsername(name);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();

  }, [username]);
  const countTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status).length;
  };

  const completedTasksCount = countTasksByStatus(2);
  const inProgressTasksCount = countTasksByStatus(1);
  const pendingTasksCount = countTasksByStatus(0);
  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute isAdminRoute={false}><Dashboard completedTasksCount={completedTasksCount} inProgressTasksCount={inProgressTasksCount} pendingTasksCount={pendingTasksCount} /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute isAdminRoute={true}><AdminDashboard completedTasksCount={completedTasksCount} inProgressTasksCount={inProgressTasksCount} pendingTasksCount={pendingTasksCount} /></ProtectedRoute>} />
        <Route path="/login" element={<Login handleSubmit={handleSubmit} handleChange={handleChange} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-task" element={<ProtectedRoute isAdminRoute={false}><CreateTask username={username} setTaskCreated={setTaskCreated} /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute isAdminRoute={false}><Tasks tasks={tasks} setTaskDeleted={setTaskDeleted}/></ProtectedRoute>} />
        <Route path="/task/:id" element={<ProtectedRoute><TaskDetail setStatusUpdated={setStatusUpdated} /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute isAdminRoute={false}><Profile user={user} handleLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/alltasks" element={<ProtectedRoute isAdminRoute={true}><AllTasks tasks={tasks} /></ProtectedRoute>} />
        <Route path="/admin-profile" element={<ProtectedRoute isAdminRoute={true}><AdminProfile user={user} handleLogout={handleLogout} /></ProtectedRoute>} />

      </Routes>
    </div>
  );
}

export default App;