export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  description: string;
  subject?: string;
}

export interface Professor {
  id: string;
  name: string;
  email: string;
  subject: string;
  cpf?: string;
  matricula?: string;
  telefone?: string;
  nascimento?: string;
  senha?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  turma?: string;
  cpf?: string;
  matricula?: string;
  telefone?: string;
  nascimento?: string;
  senha?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "professor" | "student" | "teacher";
}
