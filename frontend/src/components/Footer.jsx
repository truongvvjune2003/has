import { Layout, Row, Col, Typography, Divider } from "antd";

const { Footer: AntFooter } = Layout;
const { Title, Text, Link, Paragraph } = Typography;

export default function Footer() {
  return (
    <AntFooter
      style={{
        background: "#001529",
        color: "#fff",
        padding: "40px 24px",
      }}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Title level={5} style={{ color: "#fff", marginBottom: 12 }}>
            Healthcare
          </Title>
          <Paragraph style={{ color: "rgba(255,255,255,0.85)", marginBottom: 0 }}>
            Hệ thống đặt lịch khám và quản lý hồ sơ y tế.
          </Paragraph>
        </Col>

        <Col xs={12} md={8}>
          <Title level={6} style={{ color: "#fff", marginBottom: 12 }}>
            Liên kết nhanh
          </Title>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><Link href="/appointments">Kiểm tra cuộc hẹn</Link></li>
            <li><Link href="/login">Đăng nhập</Link></li>
            <li><Link href="/register">Đăng ký</Link></li>
          </ul>
        </Col>

        <Col xs={12} md={8}>
          <Title level={6} style={{ color: "#fff", marginBottom: 12 }}>
            Liên hệ
          </Title>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><Text style={{ color: "#fff" }}>Email: truongvvjune2003@gmail.com</Text></li>
            <li><Text style={{ color: "#fff" }}>Số điện thoại: 0865537918</Text></li>
          </ul>
        </Col>
      </Row>

      <Divider style={{ borderColor: "rgba(255,255,255,0.15)", margin: "24px 0" }} />

      <div style={{ textAlign: "center" }}>
        <small style={{ color: "rgba(255,255,255,0.65)" }}>
          © 2025 Healthcare Appointment System
        </small>
      </div>
    </AntFooter>
  );
}
