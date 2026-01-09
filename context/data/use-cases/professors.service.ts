import api from "../../../services/api";
import { Professor } from "../../../types";

const mapProfessorFromAPI = (prof: any): Professor => {
  return {
    id: prof._id || prof.id,
    name: prof.name || prof.nome,
    email: prof.email,
    subject: prof.subject || prof.materia || prof.disciplina,
    cpf: prof.cpf,
    matricula: prof.matricula,
    telefone: prof.telefone,
    nascimento: prof.nascimento,
  };
};

const mapProfessorToAPI = (professor: Partial<Professor>): any => {
  const apiData: any = {};
  if (professor.name) apiData.nome = professor.name;
  if (professor.email) apiData.email = professor.email;
  if (professor.subject) apiData.disciplina = professor.subject;
  if (professor.cpf) apiData.cpf = professor.cpf;
  if (professor.matricula) apiData.matricula = professor.matricula;
  if (professor.telefone) apiData.telefone = professor.telefone;
  if (professor.nascimento) apiData.nascimento = professor.nascimento;
  return apiData;
};

export const loadProfessorsService = async (): Promise<Professor[]> => {
  try {
    const response = await api.get("/api/teachers");

    const mappedProfessors = (response.data || [])
      .map(mapProfessorFromAPI)
      .filter((prof: Professor) => prof?.id);

    return mappedProfessors;
  } catch (error: any) {
    console.error(
      "Erro ao carregar professores:",
      error.response?.data || error.message
    );
    return [];
  }
};

export const createProfessorService = async (
  professorData: Omit<Professor, "id">
): Promise<Professor> => {
  const apiData: any = {
    nome: professorData.name,
    email: professorData.email,
    disciplina: professorData.subject,
    cpf: professorData.cpf,
    matricula: professorData.matricula,
    telefone: professorData.telefone,
    nascimento: professorData.nascimento,
  };

  if (professorData.senha) {
    apiData.senha = professorData.senha;
  }

  const response = await api.post("/api/teachers", apiData);
  return mapProfessorFromAPI(response.data);
};

export const updateProfessorService = async (
  id: string,
  professorData: Partial<Professor>
): Promise<void> => {
  const apiData = mapProfessorToAPI(professorData);
  await api.patch(`/api/teachers/${id}`, apiData);
};

export const deleteProfessorService = async (id: string): Promise<void> => {
  await api.delete(`/api/teachers/${id}`);
};
