import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarRepairServices } from './carRepair.services';

const createRepairService = catchAsync(async (req, res) => {
  const { id } = req.user;

  const payload = { ...req.body, createdBy: id };

  const result = await CarRepairServices.createCarRepairServiceIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Repair service is created successfully',
    data: result,
  });
});
const assignTechnicianRepairService = catchAsync(async (req, res) => {
  const { id } = req.user;

  const { repairId } = req.params;

  const { technician } = req.body;

  const result = await CarRepairServices.assignTechnicianCarRepairServiceIntoDB(
    repairId,
    technician,
    id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Repair service assigned Technician  successfully',
    data: result,
  });
});
const updateTechnicianRepairService = catchAsync(async (req, res) => {
  const { id } = req.user;

  const { repairId } = req.params;
  const { technicianNotes, partsNeeded, estimatedDays, status } = req.body;
  const payload = {
    technicianNotes,
    partsNeeded,
    estimatedDays,
    status,
  };

  const result = await CarRepairServices.technicianUpdateRepair(
    repairId,

    id,
    payload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Repair service assigned Technician  successfully',
    data: result,
  });
});

export const CarRepairController = {
  createRepairService,
  assignTechnicianRepairService,
  updateTechnicianRepairService,
};
