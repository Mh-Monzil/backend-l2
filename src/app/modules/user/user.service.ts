import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentInDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not provided then use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  //manually generated id
  userData.id = '2030100001';

  //create a user
  const newUser = await UserModel.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await StudentModel.create(studentData);

    return newStudent;
  }
};

export const UserServices = {
  createStudentInDB,
};
