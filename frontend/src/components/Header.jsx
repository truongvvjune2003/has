import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Healthcare</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/appointments">Check Appointment</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
