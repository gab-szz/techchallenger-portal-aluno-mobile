import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import api from "../services/api";
import { Post, Professor, Student } from "../types";

interface DataContextData {
  // Posts
  posts: Post[];
  loadingPosts: boolean;
  getPost: (id: string) => Post | undefined;
  createPost: (post: Omit<Post, "id" | "createdAt">) => Promise<Post>;
  updatePost: (id: string, post: Partial<Post>) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;

  // Professors
  professors: Professor[];
  loadingProfessors: boolean;
  getProfessor: (id: string) => Professor | undefined;
  createProfessor: (professor: Omit<Professor, "id">) => Promise<Professor>;
  updateProfessor: (
    id: string,
    professor: Partial<Professor>
  ) => Promise<boolean>;
  deleteProfessor: (id: string) => Promise<boolean>;
  refreshProfessors: () => Promise<void>;

  // Students
  students: Student[];
  loadingStudents: boolean;
  getStudent: (id: string) => Student | undefined;
  createStudent: (student: Omit<Student, "id">) => Promise<Student>;
  updateStudent: (id: string, student: Partial<Student>) => Promise<boolean>;
  deleteStudent: (id: string) => Promise<boolean>;
  refreshStudents: () => Promise<void>;
}

const DataContext = createContext<DataContextData>({} as DataContextData);

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingProfessors, setLoadingProfessors] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Carrega apenas posts públicos ao iniciar
  // Professores e alunos só são carregados após login (requerem token)
  useEffect(() => {
    loadPosts();
  }, []);

  // ==================== POSTS ====================

  const loadPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await api.get("/api/posts");
      console.log("Posts recebidos da API:", response.data);

      // Mapeia os campos da API para o formato esperado
      const mappedPosts = (response.data || []).map((post: any) => ({
        id: post._id || post.id, // MongoDB usa _id
        title: post.title,
        content: post.content,
        author: post.author,
        authorId: post.authorId || post._id, // Fallback para _id
        createdAt: post.createdAt || new Date().toISOString().split("T")[0],
        description: post.description || post.subject || "", // API usa 'subject'
      }));

      // Filtra posts com ID válido
      const validPosts = mappedPosts.filter((post: Post) => {
        if (!post?.id) {
          console.warn("Post sem ID encontrado:", post);
          return false;
        }
        return true;
      });

      console.log("Posts válidos após filtro:", validPosts.length);
      setPosts(validPosts);
    } catch (error: any) {
      console.error(
        "Erro ao carregar posts:",
        error.response?.data || error.message
      );
      // Mantém array vazio em caso de erro
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  };

  const getPost = (id: string) => posts.find((p) => p.id === id);

  const createPost = async (
    postData: Omit<Post, "id" | "createdAt">
  ): Promise<Post> => {
    try {
      console.log("Dados recebidos no createPost:", postData);

      // Envia com 'subject' e 'authorName' conforme API espera
      const apiData = {
        title: postData.title,
        content: postData.content,
        authorName: postData.author || "Autor Desconhecido", // API usa 'authorName' ao invés de 'author'
        subject: postData.description, // API usa 'subject' ao invés de 'description'
      };

      console.log("Dados enviados para API:", apiData);

      const response = await api.post("/api/posts", apiData);

      // Mapeia resposta da API
      const newPost: Post = {
        id: response.data._id || response.data.id,
        title: response.data.title,
        content: response.data.content,
        author: response.data.author || response.data.authorName,
        authorId: response.data.authorId || response.data._id,
        createdAt:
          response.data.createdAt || new Date().toISOString().split("T")[0],
        description: response.data.description || response.data.subject || "",
      };

      setPosts((prev) => [newPost, ...prev]);
      return newPost;
    } catch (error: any) {
      console.error(
        "Erro ao criar post:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const updatePost = async (
    id: string,
    postData: Partial<Post>
  ): Promise<boolean> => {
    try {
      // Prepara dados com campos corretos da API
      const apiData: any = {};
      if (postData.title) apiData.title = postData.title;
      if (postData.content) apiData.content = postData.content;
      if (postData.description) apiData.subject = postData.description;
      if (postData.author) apiData.authorName = postData.author;

      await api.patch(`/api/posts/${id}`, apiData);
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...postData } : p))
      );
      return true;
    } catch (error: any) {
      console.error(
        "Erro ao atualizar post:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/api/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (error: any) {
      console.error(
        "Erro ao deletar post:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  // ==================== PROFESSORS ====================

  const loadProfessors = async () => {
    try {
      setLoadingProfessors(true);
      const response = await api.get("/api/teachers");

      // Mapeia _id para id, nome para name, materia/disciplina para subject
      const mappedProfessors = (response.data || [])
        .map((prof: any) => ({
          id: prof._id || prof.id,
          name: prof.name || prof.nome,
          email: prof.email,
          disciplina: prof.subject || prof.materia || prof.disciplina,
          cpf: prof.cpf,
          matricula: prof.matricula,
          telefone: prof.telefone,
          nascimento: prof.nascimento,
        }))
        .filter((prof: Professor) => prof?.id);

      setProfessors(mappedProfessors);
    } catch (error: any) {
      console.error(
        "Erro ao carregar professores:",
        error.response?.data || error.message
      );
      setProfessors([]);
    } finally {
      setLoadingProfessors(false);
    }
  };

  const getProfessor = (id: string) => professors.find((p) => p.id === id);

  const createProfessor = async (
    professorData: Omit<Professor, "id">
  ): Promise<Professor> => {
    try {
      // Converte campos para o formato da API
      const apiData: any = {
        nome: professorData.name,
        email: professorData.email,
        disciplina: professorData.subject, // API usa 'disciplina' ao invés de 'materia'
        cpf: professorData.cpf,
        matricula: professorData.matricula,
        telefone: professorData.telefone,
        nascimento: professorData.nascimento,
      };

      // Adiciona senha se fornecida
      if (professorData.senha) {
        apiData.senha = professorData.senha;
      }

      const response = await api.post("/api/teachers", apiData);

      // Mapeia resposta de volta
      const newProfessor = {
        id: response.data._id || response.data.id,
        name: response.data.name || response.data.nome,
        email: response.data.email,
        subject:
          response.data.subject ||
          response.data.materia ||
          response.data.disciplina,
        cpf: response.data.cpf,
        matricula: response.data.matricula,
        telefone: response.data.telefone,
        nascimento: response.data.nascimento,
      };

      setProfessors((prev) => [...prev, newProfessor]);
      return newProfessor;
    } catch (error: any) {
      console.error(
        "Erro ao criar professor:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const updateProfessor = async (
    id: string,
    professorData: Partial<Professor>
  ): Promise<boolean> => {
    try {
      // Converte campos para o formato da API
      const apiData: any = {};
      if (professorData.name) apiData.nome = professorData.name;
      if (professorData.email) apiData.email = professorData.email;
      if (professorData.subject) apiData.disciplina = professorData.subject;
      if (professorData.cpf) apiData.cpf = professorData.cpf;
      if (professorData.matricula) apiData.matricula = professorData.matricula;
      if (professorData.telefone) apiData.telefone = professorData.telefone;
      if (professorData.nascimento)
        apiData.nascimento = professorData.nascimento;

      await api.patch(`/api/teachers/${id}`, apiData);
      setProfessors((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...professorData } : p))
      );
      return true;
    } catch (error: any) {
      console.error(
        "Erro ao atualizar professor:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const deleteProfessor = async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/api/teachers/${id}`);
      setProfessors((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (error: any) {
      console.error(
        "Erro ao deletar professor:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  // ==================== STUDENTS ====================

  const loadStudents = async () => {
    try {
      setLoadingStudents(true);
      const response = await api.get("/api/students");

      // Mapeia _id para id, nome para name, curso para course
      const mappedStudents = (response.data || [])
        .map((student: any) => ({
          id: student._id || student.id,
          name: student.name || student.nome,
          email: student.email,
          course: student.course || student.curso,
          turma: student.turma,
          cpf: student.cpf,
          matricula: student.matricula,
          telefone: student.telefone,
          nascimento: student.nascimento,
        }))
        .filter((student: Student) => student?.id);

      setStudents(mappedStudents);
    } catch (error: any) {
      console.error(
        "Erro ao carregar alunos:",
        error.response?.data || error.message
      );
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  const getStudent = (id: string) => students.find((s) => s.id === id);

  const createStudent = async (
    studentData: Omit<Student, "id">
  ): Promise<Student> => {
    try {
      // Converte campos para o formato da API
      const apiData: any = {
        nome: studentData.name,
        email: studentData.email,
        curso: studentData.course,
        turma: studentData.turma,
        cpf: studentData.cpf,
        matricula: studentData.matricula,
        telefone: studentData.telefone,
        nascimento: studentData.nascimento,
      };

      // Adiciona senha se fornecida
      if (studentData.senha) {
        apiData.senha = studentData.senha;
      }

      const response = await api.post("/api/students", apiData);

      // Mapeia resposta de volta
      const newStudent = {
        id: response.data._id || response.data.id,
        name: response.data.name || response.data.nome,
        email: response.data.email,
        course: response.data.course || response.data.curso,
        turma: response.data.turma,
        cpf: response.data.cpf,
        matricula: response.data.matricula,
        telefone: response.data.telefone,
        nascimento: response.data.nascimento,
      };

      setStudents((prev) => [...prev, newStudent]);
      return newStudent;
    } catch (error: any) {
      console.error(
        "Erro ao criar aluno:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const updateStudent = async (
    id: string,
    studentData: Partial<Student>
  ): Promise<boolean> => {
    try {
      // Converte campos para o formato da API
      const apiData: any = {};
      if (studentData.name) apiData.nome = studentData.name;
      if (studentData.email) apiData.email = studentData.email;
      if (studentData.course) apiData.curso = studentData.course;
      if (studentData.turma) apiData.turma = studentData.turma;
      if (studentData.cpf) apiData.cpf = studentData.cpf;
      if (studentData.matricula) apiData.matricula = studentData.matricula;
      if (studentData.telefone) apiData.telefone = studentData.telefone;
      if (studentData.nascimento) apiData.nascimento = studentData.nascimento;

      await api.patch(`/api/students/${id}`, apiData);
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...studentData } : s))
      );
      return true;
    } catch (error: any) {
      console.error(
        "Erro ao atualizar aluno:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const deleteStudent = async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/api/students/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch (error: any) {
      console.error(
        "Erro ao deletar aluno:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  return (
    <DataContext.Provider
      value={{
        posts,
        loadingPosts,
        getPost,
        createPost,
        updatePost,
        deletePost,
        professors,
        loadingProfessors,
        getProfessor,
        createProfessor,
        updateProfessor,
        deleteProfessor,
        refreshProfessors: loadProfessors,
        students,
        loadingStudents,
        getStudent,
        createStudent,
        updateStudent,
        deleteStudent,
        refreshStudents: loadStudents,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
