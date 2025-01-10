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
import { useNavigate } from 'react-router-dom';
import api from './Services/api';

function App() {
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskCreated, setTaskCreated] = useState(false);
  const [statusUpdated, setStatusUpdated] = useState(false);
  const [user, setUser] = useState(null); // State to store user details
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/Auth/login', formData); // Use the api instance
      const token = response.data.token; // Assuming the token is in response.data.token
      localStorage.setItem('token', token);
      localStorage.setItem('username', formData.username);
      alert("Login successful!");
      setUsername(formData.username);
      //console.log(formData.username);
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const name = localStorage.getItem("username");
        const fetchedTasks = await getTasksByUsername(name);
        setTasks(fetchedTasks);
      } catch (error) {
        setTasks([]);
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
 
    console.log(user);
  }, [username, taskCreated, statusUpdated]);
  

  useEffect(()=>{
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

  },[username]);
  const countTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status).length;
  };

  const completedTasksCount = countTasksByStatus(2);
  const inProgressTasksCount = countTasksByStatus(1);
  const pendingTasksCount = countTasksByStatus(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard completedTasksCount={completedTasksCount} inProgressTasksCount={inProgressTasksCount} pendingTasksCount={pendingTasksCount} /></ProtectedRoute>} />
        <Route path="/login" element={<Login handleSubmit={handleSubmit}   handleChange={handleChange}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-task" element={<ProtectedRoute><CreateTask username={username} setTaskCreated={setTaskCreated} /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks tasks={tasks} /></ProtectedRoute>} />
        <Route path="/task/:id" element={<ProtectedRoute><TaskDetail setStatusUpdated={setStatusUpdated} /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile user={user} /></ProtectedRoute>} /> {/* Add Profile route */}
      </Routes>
    </div>
  );
}

export default App;