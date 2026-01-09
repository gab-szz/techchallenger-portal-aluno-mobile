import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Post, Professor, Student } from "../../types";
import { DataContextData } from "./data.types";
import {
  loadPostsService,
  createPostService,
  updatePostService,
  deletePostService,
} from "./use-cases/posts.service";
import {
  loadProfessorsService,
  createProfessorService,
  updateProfessorService,
  deleteProfessorService,
} from "./use-cases/professors.service";
import {
  loadStudentsService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
} from "./use-cases/students.service";

export const DataContext = createContext<DataContextData>(
  {} as DataContextData
);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingProfessors, setLoadingProfessors] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  // ==================== POSTS ====================

  const loadPosts = async () => {
    setLoadingPosts(true);
    const postsData = await loadPostsService();
    setPosts(postsData);
    setLoadingPosts(false);
  };

  const getPost = (id: string) => posts.find((p) => p.id === id);

  const createPost = async (
    postData: Omit<Post, "id" | "createdAt">
  ): Promise<Post> => {
    try {
      const newPost = await createPostService(postData);
      setPosts((prev) => [newPost, ...prev]);
      return newPost;
    } catch (error) {
      console.error("Erro ao criar post:", error);
      throw error;
    }
  };

  const updatePost = async (
    id: string,
    postData: Partial<Post>
  ): Promise<boolean> => {
    try {
      await updatePostService(id, postData);
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...postData } : p))
      );
      return true;
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      throw error;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      await deletePostService(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (error) {
      console.error("Erro ao deletar post:", error);
      throw error;
    }
  };

  // ==================== PROFESSORS ====================

  const loadProfessors = async () => {
    setLoadingProfessors(true);
    const professorsData = await loadProfessorsService();
    setProfessors(professorsData);
    setLoadingProfessors(false);
  };

  const getProfessor = (id: string) => professors.find((p) => p.id === id);

  const createProfessor = async (
    professorData: Omit<Professor, "id">
  ): Promise<Professor> => {
    try {
      const newProfessor = await createProfessorService(professorData);
      setProfessors((prev) => [...prev, newProfessor]);
      return newProfessor;
    } catch (error) {
      console.error("Erro ao criar professor:", error);
      throw error;
    }
  };

  const updateProfessor = async (
    id: string,
    professorData: Partial<Professor>
  ): Promise<boolean> => {
    try {
      await updateProfessorService(id, professorData);
      setProfessors((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...professorData } : p))
      );
      return true;
    } catch (error) {
      console.error("Erro ao atualizar professor:", error);
      throw error;
    }
  };

  const deleteProfessor = async (id: string): Promise<boolean> => {
    try {
      await deleteProfessorService(id);
      setProfessors((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (error) {
      console.error("Erro ao deletar professor:", error);
      throw error;
    }
  };

  // ==================== STUDENTS ====================

  const loadStudents = async () => {
    setLoadingStudents(true);
    const studentsData = await loadStudentsService();
    setStudents(studentsData);
    setLoadingStudents(false);
  };

  const getStudent = (id: string) => students.find((s) => s.id === id);

  const createStudent = async (
    studentData: Omit<Student, "id">
  ): Promise<Student> => {
    try {
      const newStudent = await createStudentService(studentData);
      setStudents((prev) => [...prev, newStudent]);
      return newStudent;
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      throw error;
    }
  };

  const updateStudent = async (
    id: string,
    studentData: Partial<Student>
  ): Promise<boolean> => {
    try {
      await updateStudentService(id, studentData);
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...studentData } : s))
      );
      return true;
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      throw error;
    }
  };

  const deleteStudent = async (id: string): Promise<boolean> => {
    try {
      await deleteStudentService(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
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
        refreshPosts: loadPosts,
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
