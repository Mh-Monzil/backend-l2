import status from 'http-status';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';
import AppError from '../../errors/AppError';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: payload.name,
  });

  if (isDepartmentExist) {
    throw new AppError(status.NOT_FOUND, 'Academic department already exists');
  }

  const result = await AcademicDepartmentModel.create(payload);

  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartmentModel.findById(id).populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  _id: string,
  payload: TAcademicDepartment,
) => {
  const isDepartmentExist = await AcademicDepartmentModel.findById({ _id });

  if (!isDepartmentExist) {
    throw new AppError(status.NOT_FOUND, 'Academic department does not exists');
  }

  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
