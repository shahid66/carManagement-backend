import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PartServices } from './parts.services';

const createPart = catchAsync(async (req, res) => {
  const result = await PartServices.createPartIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const getAllParts = catchAsync(async (req, res) => {
  const result = await PartServices.getAllPartIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const getPart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PartServices.getPartIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const updatePart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PartServices.updatePartIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const deletePart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PartServices.deletePartIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

export const PartControllers = {
  createPart,
  getAllParts,
  getPart,
  updatePart,
  deletePart,
};
