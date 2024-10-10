import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Container className="mt-5 text-center">
        <h1>Welcome to Fitness Tracker!</h1>
        <p>This is a fitness tracking app where you can track your workouts and stay motivated.</p>
        {user.id !== null ? (
          <p>You are logged in. Click on <Link to="/getMyWorkouts">My Workouts</Link> to view your workouts.</p>
        ) : (
          <p>Not a member yet? <Link to="/register">Register Now</Link> and start tracking your fitness journey!</p>
        )}
      </Container>
    </div>
  );
}

export default HomePage;
