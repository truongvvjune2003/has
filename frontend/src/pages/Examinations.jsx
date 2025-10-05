import { useEffect, useState } from "react";
import { getMyExaminations } from "../lib/patient";
import { Table, Typography, Alert } from "antd";

export default function Examinations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getMyExaminations().then(setItems).catch(() => setError("Không tải được dữ liệu")).finally(() => setLoading(false));
  }, []);
  const columns = [
    { title: 'Mã', dataIndex: '_id', key: '_id' },
    { title: 'Xét nghiệm', key: 'tests', render: (_, r) => (r.tests || []).map(t => t.testName).join(', ') },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt', render: (v) => new Date(v).toLocaleString() },
  ];
  return (
    <div>
      <Typography.Title level={3}>Kết quả khám</Typography.Title>
      {error && <Alert type="error" message={error} showIcon className="mb-2" />}
      <Table rowKey="_id" loading={loading} columns={columns} dataSource={items} pagination={{ pageSize: 10 }} />
    </div>
  );
}


