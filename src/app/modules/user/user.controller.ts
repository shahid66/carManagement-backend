import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const updateUserDetails = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { id, role } = req.user;
  const updateData = req.body;

  const result = await UserServices.updateDetailsUserIntoDB(
    userId,
    id,
    role,

    updateData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Update successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  updateUserDetails,
};
