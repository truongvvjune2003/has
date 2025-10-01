import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Healthcare</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/appointments">Kiểm tra cuộc hẹn</Nav.Link>
          <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
          <Nav.Link as={Link} to="/register">Đăng ký</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
