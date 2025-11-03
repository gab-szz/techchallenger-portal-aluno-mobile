import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: "#FFF" },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Página Inicial",
            title: "Página Inicial",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
