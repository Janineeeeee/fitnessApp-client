import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import '../App.css'; 

function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <div className="home-page"> 
      <Container className="mt-5 text-center">
        <h1>Welcome to ActiVibe!</h1>
        <p>This is a fitness tracking app where you can track your workouts and stay motivated.</p>
        {user.id !== null ? (
          <p>You are logged in. Click on <Link to="/getMyWorkouts" style={{color: '#ffcc00'}}>My Workouts</Link> to view your workouts.</p>
        ) : (
          <p>Not a member yet? <Link to="/register" style={{color: '#ffcc00'}}>Register Now</Link> and start tracking your fitness journey!</p>
        )}
      </Container>
    </div>
  );
}

export default HomePage;
