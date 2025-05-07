import express from 'express';
import auth from '../../middleware/auth';
import { CarRepairController } from './carRepair.controller';

const router = express.Router();

router.post(
  '/car',
  auth('admin', 'engineer', 'helper', 'manager', 'technician'),
  CarRepairController.createRepairService,
);
router.put(
  '/assign/:repairId',
  auth('manager'),
  CarRepairController.assignTechnicianRepairService,
);
router.put(
  '/technicianUpdate/:repairId',
  auth('engineer', 'helper', 'technician'),
  CarRepairController.updateTechnicianRepairService,
);

export const RepairRoutes = router;
