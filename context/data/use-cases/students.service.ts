import api from "../../../services/api";
import { Student } from "../../../types";

const mapStudentFromAPI = (student: any): Student => {
  return {
    id: student._id || student.id,
    name: student.name || student.nome,
    email: student.email,
    course: student.course || student.curso,
    turma: student.turma,
    cpf: student.cpf,
    matricula: student.matricula,
    telefone: student.telefone,
    nascimento: student.nascimento,
  };
};

const mapStudentToAPI = (student: Partial<Student>): any => {
  const apiData: any = {};
  if (student.name) apiData.nome = student.name;
  if (student.email) apiData.email = student.email;
  if (student.course) apiData.curso = student.course;
  if (student.turma) apiData.turma = student.turma;
  if (student.cpf) apiData.cpf = student.cpf;
  if (student.matricula) apiData.matricula = student.matricula;
  if (student.telefone) apiData.telefone = student.telefone;
  if (student.nascimento) apiData.nascimento = student.nascimento;
  return apiData;
};

export const loadStudentsService = async (): Promise<Student[]> => {
  try {
    const response = await api.get("/api/students");

    const mappedStudents = (response.data || [])
      .map(mapStudentFromAPI)
      .filter((student: Student) => student?.id);

    return mappedStudents;
  } catch (error: any) {
    console.error(
      "Erro ao carregar alunos:",
      error.response?.data || error.message
    );
    return [];
  }
};

export const createStudentService = async (
  studentData: Omit<Student, "id">
): Promise<Student> => {
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

  if (studentData.senha) {
    apiData.senha = studentData.senha;
  }

  const response = await api.post("/api/students", apiData);
  return mapStudentFromAPI(response.data);
};

export const updateStudentService = async (
  id: string,
  studentData: Partial<Student>
): Promise<void> => {
  const apiData = mapStudentToAPI(studentData);
  await api.patch(`/api/students/${id}`, apiData);
};

export const deleteStudentService = async (id: string): Promise<void> => {
  await api.delete(`/api/students/${id}`);
};
