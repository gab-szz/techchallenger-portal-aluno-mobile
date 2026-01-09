import { useState } from "react";
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
import { useData } from "../context/data";

export default function Admin() {
  const router = useRouter();
  const { posts, deletePost } = useData();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      "Confirmar exclusão",
      `Deseja realmente excluir o post "${title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(id);
              await deletePost(id);
              Alert.alert("Sucesso", "Post excluído com sucesso!");
            } catch {
              Alert.alert("Erro", "Não foi possível excluir o post.");
            } finally {
              setDeleting(null);
            }
          },
        },
      ]
    );
  };

  const renderPost = ({ item }: { item: (typeof posts)[0] }) => (
    <View style={styles.postCard}>
      <View style={styles.postInfo}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postAuthor}>Por: {item.author}</Text>
        <Text style={styles.postDate}>{item.createdAt}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          style={styles.editButton}
          onPress={() => {
            console.log("Clicou para editar post:", item.id, item.title);
            router.push(`/posts/edit/${item.id}` as any);
          }}
        >
          <Ionicons name="pencil" size={20} color="#007AFF" />
          <Text style={styles.editButtonText}>Editar</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id, item.title)}
          disabled={deleting === item.id}
        >
          <Ionicons name="trash" size={20} color="#FF3B30" />
          <Text style={styles.deleteButtonText}>
            {deleting === item.id ? "Excluindo..." : "Excluir"}
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gerenciar Posts</Text>
        <Pressable
          style={styles.createButton}
          onPress={() => router.push("/posts/create" as any)}
        >
          <Ionicons name="add" size={20} color="#FFF" />
          <Text style={styles.createButtonText}>Novo Post</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Pressable
          style={styles.navButton}
          onPress={() => router.push("/professors" as any)}
        >
          <Ionicons name="school-outline" size={24} color="#007AFF" />
          <Text style={styles.navButtonText}>Gerenciar Professores</Text>
          <Ionicons name="chevron-forward" size={24} color="#CCC" />
        </Pressable>

        <Pressable
          style={styles.navButton}
          onPress={() => router.push("/students" as any)}
        >
          <Ionicons name="people-outline" size={24} color="#007AFF" />
          <Text style={styles.navButtonText}>Gerenciar Alunos</Text>
          <Ionicons name="chevron-forward" size={24} color="#CCC" />
        </Pressable>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
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
  header: {
    backgroundColor: "#FFF",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  createButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    gap: 5,
  },
  createButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#FFF",
    margin: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  navButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  listContainer: {
    padding: 15,
    gap: 15,
  },
  postCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  postInfo: {
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  postAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  postDate: {
    fontSize: 12,
    color: "#999",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    gap: 5,
  },
  editButtonText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#FFEBEE",
    borderRadius: 8,
    gap: 5,
  },
  deleteButtonText: {
    color: "#FF3B30",
    fontSize: 14,
    fontWeight: "600",
  },
});
