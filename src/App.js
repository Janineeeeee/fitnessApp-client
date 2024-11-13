import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/HomePage';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import Logout from './pages/LogoutPage';
import Workouts from './pages/Workouts';
import AddWorkout from './pages/AddWorkout';
import { jwtDecode } from 'jwt-decode'; 

function App() {
  const [user, setUser] = useState({ id: null });

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser({
        id: decodedToken['id']
      });
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addWorkout" element={<AddWorkout />} />
          <Route path="/getMyWorkouts" element={<Workouts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
