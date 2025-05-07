import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.services';

const getAllUser = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllUserIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All User get successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AdminServices.changeRole(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AdminServices.updateUserIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Role is updated successfully',
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AdminServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted Successfully',
    data: result,
  });
});

export const UserControllers = {
  getAllUser,
  changeStatus,
  deleteUser,
  updateUser,
};
