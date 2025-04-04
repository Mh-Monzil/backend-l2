import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import AppError from '../../errors/AppError';
import status from 'http-status';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteFacultyFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteFaculty) {
      throw new AppError(status.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    session.endSession();

    return deleteFaculty;
  } catch (error) {
    await session.commitTransaction();
    session.endSession();
    throw error;
  }
};

export const FacultyService = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDb,
};
