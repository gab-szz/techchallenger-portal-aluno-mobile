import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useData } from "../../../context/DataContext";

export default function EditStudent() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getStudent, updateStudent } = useData();

  const student = getStudent(String(id));

  const [name, setName] = useState(student?.name || "");
  const [email, setEmail] = useState(student?.email || "");
  const [course, setCourse] = useState(student?.course || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !course) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      await updateStudent(String(id), { name, email, course });
      Alert.alert("Sucesso", "Aluno atualizado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o aluno.");
    } finally {
      setLoading(false);
    }
  };

  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aluno não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nome completo"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Curso</Text>
        <TextInput
          style={styles.input}
          value={course}
          onChangeText={setCourse}
          placeholder="Curso do aluno"
        />

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.submitButtonText}>Salvar</Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  form: {
    backgroundColor: "#FFF",
    padding: 20,
    margin: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#007AFF",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});
