import React, { createContext, useContext, useState, ReactNode } from "react";
import { Post, Professor, Student } from "../types";
import { mockPosts, mockProfessors, mockStudents } from "../data/mockData";

interface DataContextData {
  // Posts
  posts: Post[];
  getPost: (id: string) => Post | undefined;
  createPost: (post: Omit<Post, "id" | "createdAt">) => Promise<Post>;
  updatePost: (id: string, post: Partial<Post>) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;

  // Professors
  professors: Professor[];
  getProfessor: (id: string) => Professor | undefined;
  createProfessor: (professor: Omit<Professor, "id">) => Promise<Professor>;
  updateProfessor: (
    id: string,
    professor: Partial<Professor>
  ) => Promise<boolean>;
  deleteProfessor: (id: string) => Promise<boolean>;

  // Students
  students: Student[];
  getStudent: (id: string) => Student | undefined;
  createStudent: (student: Omit<Student, "id">) => Promise<Student>;
  updateStudent: (id: string, student: Partial<Student>) => Promise<boolean>;
  deleteStudent: (id: string) => Promise<boolean>;
}

const DataContext = createContext<DataContextData>({} as DataContextData);

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [professors, setProfessors] = useState<Professor[]>(mockProfessors);
  const [students, setStudents] = useState<Student[]>(mockStudents);

  // Posts
  const getPost = (id: string) => posts.find((p) => p.id === id);

  const createPost = async (
    postData: Omit<Post, "id" | "createdAt">
  ): Promise<Post> => {
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newPost: Post = {
      ...postData,
      id: String(Date.now()),
      createdAt: new Date().toISOString().split("T")[0],
    };

    setPosts((prev) => [newPost, ...prev]);
    return newPost;

    // Para substituir pela API depois:
    // const response = await api.post('/posts', postData);
    // const newPost = response.data;
    // setPosts(prev => [newPost, ...prev]);
    // return newPost;
  };

  const updatePost = async (
    id: string,
    postData: Partial<Post>
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...postData } : p))
    );
    return true;

    // Para API:
    // await api.put(`/posts/${id}`, postData);
    // setPosts(prev => prev.map(p => p.id === id ? { ...p, ...postData } : p));
    // return true;
  };

  const deletePost = async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setPosts((prev) => prev.filter((p) => p.id !== id));
    return true;

    // Para API:
    // await api.delete(`/posts/${id}`);
    // setPosts(prev => prev.filter(p => p.id !== id));
    // return true;
  };

  // Professors
  const getProfessor = (id: string) => professors.find((p) => p.id === id);

  const createProfessor = async (
    professorData: Omit<Professor, "id">
  ): Promise<Professor> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newProfessor: Professor = {
      ...professorData,
      id: String(Date.now()),
    };

    setProfessors((prev) => [...prev, newProfessor]);
    return newProfessor;
  };

  const updateProfessor = async (
    id: string,
    professorData: Partial<Professor>
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setProfessors((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...professorData } : p))
    );
    return true;
  };

  const deleteProfessor = async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setProfessors((prev) => prev.filter((p) => p.id !== id));
    return true;
  };

  // Students
  const getStudent = (id: string) => students.find((s) => s.id === id);

  const createStudent = async (
    studentData: Omit<Student, "id">
  ): Promise<Student> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newStudent: Student = {
      ...studentData,
      id: String(Date.now()),
    };

    setStudents((prev) => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = async (
    id: string,
    studentData: Partial<Student>
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...studentData } : s))
    );
    return true;
  };

  const deleteStudent = async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setStudents((prev) => prev.filter((s) => s.id !== id));
    return true;
  };

  return (
    <DataContext.Provider
      value={{
        posts,
        getPost,
        createPost,
        updatePost,
        deletePost,
        professors,
        getProfessor,
        createProfessor,
        updateProfessor,
        deleteProfessor,
        students,
        getStudent,
        createStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
