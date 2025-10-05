import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginApi, getMe } from "../lib/auth";
import { Form, Input, Button, Alert, Typography, Card } from "antd";
import { useAuthStore } from "../store/auth";

function Login() {
  const navigate = useNavigate();
  const loginStore = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const loginRes = await loginApi({ email, password });
      const { accessToken, refreshToken } = loginRes;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      const me = await getMe();
      loginStore({ user: me, accessToken, refreshToken });
      navigate("/profile", { replace: true });
    } catch (e) {
      setError(e?.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '24px auto' }}>
      <Card>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>Đăng nhập</Typography.Title>
        {error && <Alert type="error" message={error} showIcon className="mb-3" />}
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" required>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Mật khẩu" required>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>Đăng nhập</Button>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </div>
      </Card>
    </div>
  );
}

export default Login;
