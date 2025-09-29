import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Examinations() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/patient/examinations/my").then(res => setItems(res.data.data || [])).catch(() => {});
  }, []);
  return (
    <div>
      <h3>Kết quả khám</h3>
      <ul>
        {items.map(ex => (
          <li key={ex._id}>{(ex.tests || []).map(t => t.testName).join(", ")}</li>
        ))}
      </ul>
    </div>
  );
}


