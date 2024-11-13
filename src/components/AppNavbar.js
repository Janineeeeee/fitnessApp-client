import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import '../App.css';

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" className="custom-navbar text-light">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="text-light fw-bold">ActiVibe</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" className="nav-link-custom">
                            Home
                        </Nav.Link>
                        {user.id !== null ? (
                            <>
                                <Nav.Link as={NavLink} to="/addWorkout" className="nav-link-custom">Add Workout</Nav.Link>
                                <Nav.Link as={NavLink} to="/getMyWorkouts" className="nav-link-custom">Workouts</Nav.Link>
                                <Nav.Link as={NavLink} to="/logout" className="nav-link-custom">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" className="nav-link-custom">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" className="nav-link-custom">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
