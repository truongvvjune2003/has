import api from "./api";

export async function getMyAppointments() {
  const { data } = await api.get("/patient/appointments/my");
  return data.data || [];
}

export async function getMyConsultations() {
  const { data } = await api.get("/patient/consultations/history");
  return data.data || [];
}

export async function getMyExaminations() {
  const { data } = await api.get("/patient/examinations/my");
  return data.data || [];
}

export async function getMyPrescriptions() {
  const { data } = await api.get("/patient/prescriptions/my");
  return data.data || [];
}


