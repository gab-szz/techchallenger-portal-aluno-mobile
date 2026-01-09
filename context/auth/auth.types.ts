import { User } from "../../types";

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface LoginResponse {
  user: User | null;
  success: boolean;
}
