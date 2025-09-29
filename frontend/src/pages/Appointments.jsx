import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Appointments() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/patient/appointments/my").then(res => setItems(res.data.data || [])).catch(() => {});
  }, []);
  return (
    <div>
      <h3>Lịch đã đặt</h3>
      <ul>
        {items.map(a => (
          <li key={a._id}>{new Date(a.date).toLocaleString()} - {a?.doctorId?.fullName} - {a.status}</li>
        ))}
      </ul>
    </div>
  );
}


