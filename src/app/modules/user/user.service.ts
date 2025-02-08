import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentInDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not provided then use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  //set generated id
  userData.id = await generateStudentId(admissionSemester!);

  //create a user
  const newUser = await UserModel.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await StudentModel.create(payload);

    return newStudent;
  }
};

export const UserServices = {
  createStudentInDB,
};
