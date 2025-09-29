import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto pt-4">
      <Container>
        <Row className="gy-3">
          <Col xs={12} md={4}>
            <h5 className="mb-3">Healthcare</h5>
            <p className="mb-0">Hệ thống đặt lịch khám và quản lý hồ sơ y tế.</p>
          </Col>
          <Col xs={6} md={4}>
            <h6 className="mb-3">Liên kết nhanh</h6>
            <ul className="list-unstyled mb-0">
              <li><a className="text-decoration-none text-light" href="/appointments">Check Appointment</a></li>
              <li><a className="text-decoration-none text-light" href="/login">Login</a></li>
              <li><a className="text-decoration-none text-light" href="/register">Register</a></li>
            </ul>
          </Col>
          <Col xs={6} md={4}>
            <h6 className="mb-3">Liên hệ</h6>
            <ul className="list-unstyled mb-0">
              <li>Email: truongvvjune2003@gmail.com</li>
              <li>Hotline: 0865537918</li>
            </ul>
          </Col>
        </Row>
        <hr className="border-secondary my-3" />
        <div className="d-flex justify-content-between align-items-center pb-3">
          <small>© 2025 Healthcare Appointment System</small>
          <small>All rights reserved</small>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
