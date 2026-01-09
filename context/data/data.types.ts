import { Post, Professor, Student } from "../../types";

export interface DataContextData {
  // Posts
  posts: Post[];
  loadingPosts: boolean;
  getPost: (id: string) => Post | undefined;
  createPost: (post: Omit<Post, "id" | "createdAt">) => Promise<Post>;
  updatePost: (id: string, post: Partial<Post>) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  refreshPosts: () => Promise<void>;

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
