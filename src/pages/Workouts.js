import { useEffect, useState, useContext } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import UserContext from '../context/UserContext';
import { Row, Col, Container } from 'react-bootstrap';
import '../App.css';

export default function Workouts() {
  const { user } = useContext(UserContext); 
  const [workouts, setWorkouts] = useState([]);

  const fetchData = () => {
    fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.workouts) {
          setWorkouts(data.workouts);
        } else {
          setWorkouts([]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (user && user.id !== null) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="workouts-page">
      <h1 className='text-center mt-5'>My Workouts</h1>
      {workouts.length > 0 ? (
        <Row>
          {workouts.map(workout => (
            <Col md={4} lg={3} key={workout._id}>
              <WorkoutCard workout={workout} />
            </Col>
          ))}
        </Row>
      ) : (
        <h2 className='text-center'>No Workouts</h2>
      )}
    </div>
  );
}
