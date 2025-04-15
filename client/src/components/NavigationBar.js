import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginButton from './LoginButton';
import { useAuth } from '../contexts/AuthContext'; // make sure this path matches your actual folder name


function NavigationBar() {
  const { user } = useAuth(); // grab user from context

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Microfiction Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/submit">Submit</Nav.Link>
            <Nav.Link as={Link} to="/stories">Browse</Nav.Link>

            {user && (
              <Nav.Link as={Link} to="/dashboard">My Dashboard</Nav.Link>
            )}

            <LoginButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;