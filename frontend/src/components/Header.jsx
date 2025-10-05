import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

function Header() {
  const navigate = useNavigate();
  const { user, accessToken, logout } = useAuthStore();

  const onLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    // best effort logout; ignore errors
    fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:9999/api"}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken })
    }).catch(() => {});
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    logout();
    navigate("/login", { replace: true });
  };

  const menuItems = [
    { key: 'appointments', label: <Link to="/appointments">Kiểm tra cuộc hẹn</Link> },
  ];

  const userMenu = (
    <Menu
      items={[
        { key: 'profile', label: <Link to="/profile">Hồ sơ</Link> },
        { type: 'divider' },
        { key: 'logout', label: <span onClick={onLogout}>Đăng xuất</span> },
      ]}
    />
  );

  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ color: '#fff', fontWeight: 600, marginRight: 24 }}>
        <Link to="/" style={{ color: '#fff' }}>Healthcare</Link>
      </div>
      <div style={{ flex: 1 }}>
        <Menu theme="dark" mode="horizontal" selectable={false} items={menuItems} />
      </div>
      {!accessToken ? (
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" style={{ color: '#fff' }}>Đăng nhập</Link>
          <Link to="/register" style={{ color: '#fff' }}>Đăng ký</Link>
        </div>
      ) : (
        <Dropdown overlay={userMenu} placement="bottomRight" trigger={["click"]}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#fff' }}>
            <Avatar size={32} src={user?.avatar} icon={<UserOutlined />} />
            <span>{user?.fullName || 'Tài khoản'}</span>
          </div>
        </Dropdown>
      )}
    </Layout.Header>
  );
}

export default Header;
