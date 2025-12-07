export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  description: string; // description ou subject da API
  subject?: string; // Campo opcional vindo da API
}

export interface Professor {
  id: string;
  name: string;
  email: string;
  subject: string;
  cpf?: string;
  matricula?: string;
  telefone?: string;
  nascimento?: string; // Data de nascimento
  senha?: string; // Senha apenas ao criar
}

export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  turma?: string; // Turma do aluno
  cpf?: string;
  matricula?: string;
  telefone?: string;
  nascimento?: string; // Data de nascimento
  senha?: string; // Senha apenas ao criar
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "professor" | "student" | "teacher"; // API pode retornar "teacher"
}
