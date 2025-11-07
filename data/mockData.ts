import { Post, Professor, Student } from "../types";

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Introdução ao React Native",
    description: "Aprenda os conceitos básicos do React Native",
    content:
      "React Native é um framework para desenvolvimento mobile multiplataforma. Permite criar aplicativos nativos usando JavaScript e React. Com ele, você pode compartilhar código entre iOS e Android, mantendo a performance nativa.",
    author: "Prof. Silva",
    authorId: "1",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "Node.js e APIs REST",
    description: "Como construir APIs robustas com Node.js",
    content:
      "Node.js é uma plataforma poderosa para construir APIs REST. Utilizando Express.js, podemos criar endpoints eficientes, implementar autenticação, validação de dados e muito mais. Neste artigo, exploraremos as melhores práticas.",
    author: "Prof. Santos",
    authorId: "2",
    createdAt: "2025-01-20",
  },
  {
    id: "3",
    title: "TypeScript na Prática",
    description: "Benefícios de usar TypeScript em projetos modernos",
    content:
      "TypeScript adiciona tipagem estática ao JavaScript, tornando o código mais seguro e manutenível. Com interfaces, tipos personalizados e inferência de tipos, podemos detectar erros em tempo de desenvolvimento.",
    author: "Prof. Silva",
    authorId: "1",
    createdAt: "2025-02-01",
  },
];

export const mockProfessors: Professor[] = [
  {
    id: "1",
    name: "Prof. João Silva",
    email: "joao.silva@escola.com",
    subject: "Desenvolvimento Mobile",
  },
  {
    id: "2",
    name: "Prof. Maria Santos",
    email: "maria.santos@escola.com",
    subject: "Backend e APIs",
  },
  {
    id: "3",
    name: "Prof. Carlos Oliveira",
    email: "carlos.oliveira@escola.com",
    subject: "TypeScript e JavaScript",
  },
];

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ana Paula",
    email: "ana.paula@aluno.com",
    course: "Desenvolvimento Full Stack",
  },
  {
    id: "2",
    name: "Pedro Henrique",
    email: "pedro.henrique@aluno.com",
    course: "Desenvolvimento Mobile",
  },
  {
    id: "3",
    name: "Mariana Costa",
    email: "mariana.costa@aluno.com",
    course: "Desenvolvimento Full Stack",
  },
  {
    id: "4",
    name: "Lucas Ferreira",
    email: "lucas.ferreira@aluno.com",
    course: "Backend Development",
  },
];
