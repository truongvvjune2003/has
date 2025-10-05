import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerApi } from "../lib/auth";
import { Form, Input, Select, DatePicker, Button, Alert, Typography, Card } from "antd";
import dayjs from "dayjs";

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Patient");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const payload = { role, fullName, dateOfBirth, gender, email, phone, password, address };
      if (role === "Doctor") payload.specialization = specialization;
      await registerApi(payload);
      setSuccess("Đăng ký thành công. Vui lòng đăng nhập.");
      setTimeout(() => navigate("/login", { replace: true }), 1000);
    } catch (e) {
      setError(e?.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '24px auto' }}>
      <Card>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>Đăng ký</Typography.Title>
        {error && <Alert type="error" message={error} showIcon className="mb-3" />}
        {success && <Alert type="success" message={success} showIcon className="mb-3" />}        
        <Form layout="vertical" onFinish={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Vai trò" required>
                <Select value={role} onChange={setRole} options={[
                  { value: 'Patient', label: 'Bệnh nhân' },
                  { value: 'Doctor', label: 'Bác sĩ' },
                  { value: 'Receptionist', label: 'Lễ tân' },
                  { value: 'Pharmacist', label: 'Dược sĩ' },
                ]} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Họ tên" required>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Ngày sinh" required>
                <DatePicker style={{ width: '100%' }} value={dateOfBirth ? dayjs(dateOfBirth) : null} onChange={(d) => setDateOfBirth(d ? d.format('YYYY-MM-DD') : '')} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Giới tính" required>
                <Select value={gender} onChange={setGender} options={[
                  { value: 'Male', label: 'Nam' },
                  { value: 'Female', label: 'Nữ' },
                  { value: 'Other', label: 'Khác' },
                ]} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Email" required>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Số điện thoại" required>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Mật khẩu" required>
                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Địa chỉ">
                <Input value={address} onChange={(e) => setAddress(e.target.value)} />
              </Form.Item>
            </div>
            {role === 'Doctor' && (
              <div className="col-12">
                <Form.Item label="Chuyên khoa">
                  <Input value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                </Form.Item>
              </div>
            )}
          </div>

          <Button type="primary" htmlType="submit" block loading={loading}>Đăng ký</Button>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </Card>
    </div>
  );
}

export default Register;
