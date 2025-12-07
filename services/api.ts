import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ⚠️ IMPORTANTE: Substitua este IP pelo seu IP local da máquina que está rodando o Node.js
// Para descobrir seu IP no Linux: ip addr show | grep "inet " | grep -v 127.0.0.1
// Para descobrir seu IP no Windows: ipconfig
// Para descobrir seu IP no Mac: ifconfig | grep "inet " | grep -v 127.0.0.1
const IP_LOCAL = "192.168.0.14"; // 👈 ALTERE AQUI PARA SEU IP LOCAL

const API_BASE_URL = `http://${IP_LOCAL}:3333`;

// Cria instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de REQUEST - Adiciona token JWT em todas as requisições
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("@auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao carregar token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de RESPONSE - Trata erros de autenticação
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado - remove do storage
      try {
        await AsyncStorage.removeItem("@auth_token");
        await AsyncStorage.removeItem("@auth_user");
      } catch (e) {
        console.error("Erro ao limpar dados de autenticação:", e);
      }
    }

    // Log de erros para debugging
    console.error("Erro na API:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
