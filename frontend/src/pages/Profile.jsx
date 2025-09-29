import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Profile() {
  const [me, setMe] = useState(null);
  useEffect(() => {
    api.get("/auth/me").then(res => setMe(res.data.data)).catch(() => {});
  }, []);
  if (!me) return null;
  return (
    <div>
      <h3>Thông tin cá nhân</h3>
      <div>Họ tên: {me.fullName}</div>
      <div>Email: {me.email}</div>
      <div>Giới tính: {me.gender}</div>
      <div>Ngày sinh: {new Date(me.dateOfBirth).toLocaleDateString()}</div>
      <div>SĐT: {me.phone}</div>
      {me.address && <div>Địa chỉ: {me.address}</div>}
    </div>
  );
}


