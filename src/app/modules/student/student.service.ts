import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentInDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find({});
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });

  return result;
};

export const StudentService = {
  createStudentInDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
