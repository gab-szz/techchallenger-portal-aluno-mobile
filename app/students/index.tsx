import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useData } from "../../context/data";
import { useState, useEffect } from "react";

export default function StudentsIndex() {
  const router = useRouter();
  const { students, deleteStudent, refreshStudents } = useData();
  const [deleting, setDeleting] = useState<string | null>(null);

  // Carrega alunos ao abrir a tela (requer autenticação)
  useEffect(() => {
    refreshStudents();
  }, []);

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      "Confirmar exclusão",
      `Deseja realmente excluir o aluno ${name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(id);
              await deleteStudent(id);
              Alert.alert("Sucesso", "Aluno excluído com sucesso!");
            } catch {
              Alert.alert("Erro", "Não foi possível excluir o aluno.");
            } finally {
              setDeleting(null);
            }
          },
        },
      ]
    );
  };

  const renderStudent = ({ item }: { item: (typeof students)[0] }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.course}>{item.course}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          style={styles.editButton}
          onPress={() => router.push(`/students/edit/${item.id}` as any)}
        >
          <Ionicons name="pencil" size={20} color="#007AFF" />
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id, item.name)}
          disabled={deleting === item.id}
        >
          <Ionicons
            name="trash"
            size={20}
            color={deleting === item.id ? "#CCC" : "#FF3B30"}
          />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.createButton}
        onPress={() => router.push("/students/create" as any)}
      >
        <Ionicons name="add" size={24} color="#FFF" />
        <Text style={styles.createButtonText}>Novo Aluno</Text>
      </Pressable>

      <FlatList
        data={students}
        renderItem={renderStudent}
        keyExtractor={(item, index) =>
          item?.id ? String(item.id) : `student-${index}`
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  createButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 15,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  course: {
    fontSize: 14,
    color: "#007AFF",
  },
  actions: {
    flexDirection: "row",
    marginLeft: 10,
  },
  editButton: {
    padding: 8,
    marginRight: 10,
  },
  deleteButton: {
    padding: 8,
  },
});
