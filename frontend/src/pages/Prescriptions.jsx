import { useEffect, useState } from "react";
import { getMyPrescriptions } from "../lib/patient";
import { Table, Typography, Alert } from "antd";

export default function Prescriptions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getMyPrescriptions().then(setItems).catch(() => setError("Không tải được dữ liệu")).finally(() => setLoading(false));
  }, []);
  const columns = [
    { title: 'Bác sĩ', dataIndex: ['doctorId','fullName'], key: 'doctor' },
    { title: 'Số thuốc', key: 'count', render: (_, r) => (r.prescription || []).length },
    { title: 'Ngày kê', dataIndex: 'createdAt', key: 'createdAt', render: (v) => new Date(v).toLocaleString() },
  ];
  return (
    <div>
      <Typography.Title level={3}>Đơn thuốc</Typography.Title>
      {error && <Alert type="error" message={error} showIcon className="mb-2" />}
      <Table rowKey="_id" loading={loading} columns={columns} dataSource={items} pagination={{ pageSize: 10 }} />
    </div>
  );
}


