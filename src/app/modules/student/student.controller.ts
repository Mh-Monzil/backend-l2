import { StudentService } from './student.service';
import status from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single student created successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentService.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
