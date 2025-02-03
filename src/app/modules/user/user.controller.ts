import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // will call service to send this data
  const result = await UserServices.createStudentInDB(password, studentData);

  //send response
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
