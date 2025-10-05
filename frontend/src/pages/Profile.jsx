import { useEffect, useState } from "react";
import api from "../lib/api";
import { useAuthStore } from "../store/auth";
import { Card, Typography, Form, Input, Select, DatePicker, Button, Alert, Upload, Avatar, Space } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { uploadImage } from "../lib/upload";

export default function Profile() {
  const setLogin = useAuthStore((s) => s.login);
  const auth = useAuthStore();
  const [me, setMe] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    api.get("/auth/me").then(res => {
      const u = res.data.data;
      setMe(u);
      setFullName(u.fullName || "");
      setDateOfBirth(u.dateOfBirth ? u.dateOfBirth.substring(0,10) : "");
      setGender(u.gender || "Male");
      setPhone(u.phone || "");
      setAddress(u.address || "");
      setAvatar(u.avatar || "");
    }).catch(() => {});
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    setSaving(true);
    try {
      const { data } = await api.patch("/auth/me", { fullName, dateOfBirth, gender, phone, address, avatar });
      setMe(data.data);
      // also update store user
      setLogin({ user: data.data, accessToken: auth.accessToken, refreshToken: auth.refreshToken });
      setMsg("Cập nhật hồ sơ thành công");
    } catch (e) {
      setErr(e?.response?.data?.message || "Cập nhật hồ sơ thất bại");
    } finally {
      setSaving(false);
    }
  };

  const uploadAvatar = async (file) => {
    return uploadImage(file);
  };

  const onChangeAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr("");
    try {
      const url = await uploadAvatar(file);
      setAvatar(url);
      setMsg("Tải ảnh thành công");
    } catch (e) {
      setErr("Tải ảnh thất bại");
    }
  };

  const submitChangePassword = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    setChangingPw(true);
    try {
      await api.put("/auth/change-password", { currentPassword, newPassword });
      setMsg("Đổi mật khẩu thành công");
      setCurrentPassword("");
      setNewPassword("");
    } catch (e) {
      setErr(e?.response?.data?.message || "Đổi mật khẩu thất bại");
    } finally {
      setChangingPw(false);
    }
  };

  if (!me) return null;

  return (
    <div style={{ maxWidth: 900, margin: '24px auto' }}>
      {msg && <Alert type="success" message={msg} showIcon className="mb-3" />}
      {err && <Alert type="error" message={err} showIcon className="mb-3" />}

      <Card>
        <Typography.Title level={4}>Thông tin cá nhân</Typography.Title>
        <div className="row g-4">
          <div className="col-md-4">
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <Avatar size={128} src={avatar} icon={<UserOutlined />} />
              <input type="file" accept="image/*" onChange={onChangeAvatar} />
            </Space>
          </div>
          <div className="col-md-8">
            <Form layout="vertical" onFinish={saveProfile}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Item label="Họ tên">
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="Email">
                    <Input value={me.email} disabled />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="Ngày sinh">
                    <DatePicker style={{ width: '100%' }} value={dateOfBirth ? dayjs(dateOfBirth) : null} onChange={(d) => setDateOfBirth(d ? d.format('YYYY-MM-DD') : '')} />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="Giới tính">
                    <Select value={gender} onChange={setGender} options={[{ value: 'Male', label: 'Nam' }, { value: 'Female', label: 'Nữ' }, { value: 'Other', label: 'Khác' }]} />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="SĐT">
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="Địa chỉ">
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                  </Form.Item>
                </div>
              </div>
              <Button type="primary" htmlType="submit" loading={saving}>Lưu thay đổi</Button>
            </Form>
          </div>
        </div>
      </Card>

      <Card className="mt-3">
        <Typography.Title level={4}>Đổi mật khẩu</Typography.Title>
        <Form layout="vertical" onFinish={submitChangePassword} style={{ maxWidth: 520 }}>
          <Form.Item label="Mật khẩu hiện tại" required>
            <Input.Password value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </Form.Item>
          <Form.Item label="Mật khẩu mới" required>
            <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={changingPw}>Đổi mật khẩu</Button>
        </Form>
      </Card>
    </div>
  );
}


