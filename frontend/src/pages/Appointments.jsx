import { useEffect, useState } from "react";
import { getMyAppointments } from "../lib/patient";

export default function Appointments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getMyAppointments().then(setItems).catch(() => setError("Không tải được dữ liệu"))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <h3>Lịch đã đặt</h3>
      {loading && <div>Đang tải...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && items.length === 0 && <div>Không có dữ liệu</div>}
      {!loading && !error && items.length > 0 && (
        <ul>
          {items.map(a => (
            <li key={a._id}>{new Date(a.date).toLocaleString()} - {a?.doctorId?.fullName} - {a.status}</li>
          ))}
        </ul>
      )}
    </div>
  );
}


