import { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import '../App.css';

export default function AddWorkout() {
  const notyf = new Notyf();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(name.trim() !== "" && duration.trim() !== "");
  }, [name, duration]);

  function createWorkout(e) {
    e.preventDefault();

    let token = localStorage.getItem('token');

    fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, duration })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          notyf.error(data.error);
        } else {
          setName("");
          setDuration("");
          notyf.success("Workout Creation Successful");
          navigate("/getMyWorkouts");
        }
      })
      .catch(err => {
        console.error(err);
        notyf.error("Error: Something Went Wrong.");
      });
  }

  return (
    (user.id !== null) ? (
      <div className="add-workout-page">
        <Form onSubmit={createWorkout} className="workout-form">
          <h1 className="my-3 text-center">Add Workout</h1>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Duration:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Duration"
              required
              value={duration}
              onChange={e => setDuration(e.target.value)}
            />
          </Form.Group>
          {error && <p className="error-message">{error}</p>}
          <Button 
            className="my-2" 
            variant={isActive ? "dark" : "warning"} 
            type="submit" 
            id="workoutBtn" 
            disabled={!isActive}
          >
            Add Workout
          </Button>
        </Form>
      </div>
    ) : (
      <Navigate to="/getMyWorkouts" />
    )
  );
}
