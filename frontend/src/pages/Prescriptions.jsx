import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Prescriptions() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/patient/prescriptions/my").then(res => setItems(res.data.data || [])).catch(() => {});
  }, []);
  return (
    <div>
      <h3>Đơn thuốc</h3>
      <ul>
        {items.map(p => (
          <li key={p._id}>{p?.doctorId?.fullName} - {(p.prescription||[]).length} thuốc</li>
        ))}
      </ul>
    </div>
  );
}


