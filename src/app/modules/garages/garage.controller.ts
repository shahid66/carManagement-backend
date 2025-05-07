import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GarageServices } from './garage.services';

const createGarage = catchAsync(async (req, res) => {
  const result = await GarageServices.createGarageIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const getAllGarages = catchAsync(async (req, res) => {
  const result = await GarageServices.getAllGarageIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const getGarage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GarageServices.getGarageIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const updateGarage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GarageServices.updateGarageIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const deleteGarage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GarageServices.deleteGarageIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

export const GarageControllers = {
  createGarage,
  getAllGarages,
  getGarage,
  updateGarage,
  deleteGarage,
};
