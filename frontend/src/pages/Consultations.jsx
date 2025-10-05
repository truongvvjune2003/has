import { useEffect, useState } from "react";
import { getMyConsultations } from "../lib/patient";
import { Table, Typography, Alert } from "antd";

export default function Consultations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getMyConsultations().then(setItems).catch(() => setError("Không tải được dữ liệu")).finally(() => setLoading(false));
  }, []);
  const columns = [
    { title: 'Bác sĩ', dataIndex: ['doctorId','fullName'], key: 'doctor' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    { title: 'Cuộc hẹn', dataIndex: ['appointmentId','_id'], key: 'appointment' },
  ];
  return (
    <div>
      <Typography.Title level={3}>Lịch sử khám</Typography.Title>
      {error && <Alert type="error" message={error} showIcon className="mb-2" />}
      <Table rowKey="_id" loading={loading} columns={columns} dataSource={items} pagination={{ pageSize: 10 }} />
    </div>
  );
}


