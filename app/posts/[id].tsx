import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useData } from "../../context/DataContext";

export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const { getPost } = useData();
  const post = getPost(String(id));

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Post não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.author}>Por: {post.author}</Text>
        <Text style={styles.date}>{post.createdAt}</Text>
        <View style={styles.divider} />
        <Text style={styles.body}>{post.content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    backgroundColor: "#FFF",
    padding: 20,
    margin: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: 15,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});
