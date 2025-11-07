import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { DataProvider } from "../context/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

function DrawerContent() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#FFF" },
        headerRight: () =>
          isAuthenticated ? (
            <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
              <Ionicons name="log-out-outline" size={24} color="#000" />
            </Pressable>
          ) : null,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Posts",
          title: "Posts",
          drawerIcon: ({ color }) => (
            <Ionicons name="list" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="login"
        options={{
          drawerLabel: "Login",
          title: "Login",
          drawerItemStyle: { display: isAuthenticated ? "none" : "flex" },
          drawerIcon: ({ color }) => (
            <Ionicons name="log-in-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="admin"
        options={{
          drawerLabel: "Administração",
          title: "Administração",
          drawerItemStyle: {
            display:
              isAuthenticated && user?.role === "professor" ? "flex" : "none",
          },
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="posts/[id]"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Post",
        }}
      />
      <Drawer.Screen
        name="posts/create"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Criar Post",
        }}
      />
      <Drawer.Screen
        name="posts/edit/[id]"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Editar Post",
        }}
      />
      <Drawer.Screen
        name="professors/index"
        options={{
          drawerLabel: "Professores",
          title: "Professores",
          drawerItemStyle: {
            display:
              isAuthenticated && user?.role === "professor" ? "flex" : "none",
          },
          drawerIcon: ({ color }) => (
            <Ionicons name="school-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="professors/create"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Cadastrar Professor",
        }}
      />
      <Drawer.Screen
        name="professors/edit/[id]"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Editar Professor",
        }}
      />
      <Drawer.Screen
        name="students/index"
        options={{
          drawerLabel: "Alunos",
          title: "Alunos",
          drawerItemStyle: {
            display:
              isAuthenticated && user?.role === "professor" ? "flex" : "none",
          },
          drawerIcon: ({ color }) => (
            <Ionicons name="people-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="students/create"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Cadastrar Aluno",
        }}
      />
      <Drawer.Screen
        name="students/edit/[id]"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Editar Aluno",
        }}
      />
    </Drawer>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <DataProvider>
          <DrawerContent />
        </DataProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
