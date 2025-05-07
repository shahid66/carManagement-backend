import express from 'express';
import { GarageControllers } from './garage.controller';

const router = express.Router();

router.post('/', GarageControllers.createGarage);

router.get('/', GarageControllers.getAllGarages);
router.get('/:id', GarageControllers.getGarage);
router.patch('/:id', GarageControllers.updateGarage);
router.delete('/:id', GarageControllers.deleteGarage);

export const GarageRoutes = router;
