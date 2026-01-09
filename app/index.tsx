import { useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/auth";
import { useData } from "../context/data";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { posts, loadingPosts } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPost = ({ item }: { item: (typeof posts)[0] }) => (
    <Pressable
      style={styles.postCard}
      onPress={() => router.push(`/posts/${item.id}` as any)}
    >
      <Text style={styles.postTitle}>{item?.title || "Sem título"}</Text>
      <Text style={styles.postAuthor}>
        Por: {item?.author || "Desconhecido"}
      </Text>
      <Text style={styles.postDescription}>
        {item?.description || "Sem descrição"}
      </Text>
      <Text style={styles.postDate}>{item?.createdAt || ""}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar posts..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {isAuthenticated && user?.role === "professor" && (
          <Pressable
            style={styles.createButton}
            onPress={() => router.push("/posts/create" as any)}
          >
            <Ionicons name="add" size={24} color="#FFF" />
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item, index) =>
          item?.id ? String(item.id) : `post-${index}`
        }
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          loadingPosts ? (
            <Text style={styles.emptyText}>Carregando posts...</Text>
          ) : (
            <Text style={styles.emptyText}>
              Nenhum post encontrado{"\n"}
              Total de posts: {posts.length}
            </Text>
          )
        }
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
    flexDirection: "row",
    padding: 15,
    gap: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
  },
  createButton: {
    width: 45,
    height: 45,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 15,
  },
  postCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 15,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  postAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },
  postDate: {
    fontSize: 12,
    color: "#999",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});
