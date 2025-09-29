import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Consultations() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/patient/consultations/history").then(res => setItems(res.data.data || [])).catch(() => {});
  }, []);
  return (
    <div>
      <h3>Lịch sử khám</h3>
      <ul>
        {items.map(c => (
          <li key={c._id}>{c?.doctorId?.fullName} - {c.status}</li>
        ))}
      </ul>
    </div>
  );
}


