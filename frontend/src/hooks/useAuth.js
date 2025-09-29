import { useAuthStore } from "../store/auth";

export default function useAuth() {
  const { user, accessToken, refreshToken, login, logout, setTokens } = useAuthStore();
  return { user, accessToken, refreshToken, login, logout, setTokens };
}


