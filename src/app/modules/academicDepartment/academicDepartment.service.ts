import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: payload.name,
  });

  if (isDepartmentExist) {
    throw new Error('Academic department already exists');
  }

  const result = await AcademicDepartmentModel.create(payload);

  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartmentModel.find();
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id);
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  _id: string,
  payload: TAcademicDepartment,
) => {
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
