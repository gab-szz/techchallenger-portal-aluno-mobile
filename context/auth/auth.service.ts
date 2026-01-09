import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import { User } from "../../types";
import { LoginResponse } from "./auth.types";

const STORAGE_KEYS = {
  TOKEN: "@auth_token",
  USER: "@auth_user",
} as const;

export const loadStoredAuth = async (): Promise<User | null> => {
  try {
    const [token, userJson] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
      AsyncStorage.getItem(STORAGE_KEYS.USER),
    ]);

    if (token && userJson) {
      return JSON.parse(userJson);
    }
    return null;
  } catch (error) {
    console.error("Erro ao carregar dados de autenticação:", error);
    return null;
  }
};

const mapUserData = (userData: any): User => {
  return {
    id: userData.id || userData._id,
    name: userData.name || userData.nome,
    email: userData.email,
    role: userData.role === "teacher" ? "professor" : "student",
  };
};

export const loginService = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      senha: password,
    });

    const { token, user: userData } = response.data;

    const mappedUser = mapUserData(userData);

    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
      AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mappedUser)),
    ]);

    return { user: mappedUser, success: true };
  } catch (error: any) {
    console.error("Erro no login:", error.response?.data || error.message);
    return { user: null, success: false };
  }
};

export const logoutService = async (): Promise<void> => {
  try {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.USER),
    ]);
  } catch (error) {
    console.error("Erro no logout:", error);
  }
};
