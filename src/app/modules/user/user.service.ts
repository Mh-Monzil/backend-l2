import { startSession } from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import status from 'http-status';

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

  const session = await startSession();

  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateStudentId(admissionSemester!);

    //create a user (transaction - 1)
    const newUser = await UserModel.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create a user');
    } else {
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;

      //create a student (transaction - 2)
      const newStudent = await StudentModel.create([payload], { session });

      if (!newStudent.length) {
        throw new AppError(status.BAD_REQUEST, 'Failed to create a student');
      }

      await session.commitTransaction();
      await session.endSession();

      return newStudent;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const UserServices = {
  createStudentInDB,
};
