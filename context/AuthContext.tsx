import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { User } from "../types";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega token e usuário salvos ao iniciar o app
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [token, userJson] = await Promise.all([
        AsyncStorage.getItem("@auth_token"),
        AsyncStorage.getItem("@auth_user"),
      ]);

      if (token && userJson) {
        const storedUser = JSON.parse(userJson);
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Erro ao carregar dados de autenticação:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);

      // Faz requisição de login para a API
      // A API espera 'senha' ao invés de 'password'
      const response = await api.post("/api/auth/login", {
        email,
        senha: password, // API usa 'senha' ao invés de 'password'
      });

      const { token, user: userData } = response.data;

      console.log("Dados do usuário recebidos:", userData);

      // Mapeia role: API pode retornar "teacher" mas app usa "professor"
      // Mapeia nome: API retorna "nome" mas app usa "name"
      const mappedUser: User = {
        id: userData.id || userData._id,
        name: userData.name || userData.nome,
        email: userData.email,
        role: userData.role === "teacher" ? "professor" : "student",
      };

      console.log("Usuário mapeado:", mappedUser);

      // Salva token e dados do usuário
      await Promise.all([
        AsyncStorage.setItem("@auth_token", token),
        AsyncStorage.setItem("@auth_user", JSON.stringify(mappedUser)),
      ]);

      setUser(mappedUser);
      return true;
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Remove token e dados do usuário
      await Promise.all([
        AsyncStorage.removeItem("@auth_token"),
        AsyncStorage.removeItem("@auth_user"),
      ]);
      setUser(null);
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
