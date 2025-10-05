import api from "./api";

export async function login({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  return data; // { success, accessToken, refreshToken }
}

export async function register(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data.data; // user object
}

export async function updateMe(body) {
  const { data } = await api.patch("/auth/me", body);
  return data.data; // updated user
}

export async function changePassword({ currentPassword, newPassword }) {
  const { data } = await api.put("/auth/change-password", { currentPassword, newPassword });
  return data;
}

export async function logout(refreshToken) {
  // best-effort logout; API may not return anything useful
  try {
    await api.post("/auth/logout", { token: refreshToken });
  } catch (_) {}
}


