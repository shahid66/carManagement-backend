import express from 'express';
import { PartControllers } from './parts.controller';

const router = express.Router();

router.post('/', PartControllers.createPart);

router.get('/', PartControllers.getAllParts);
router.get('/:id', PartControllers.getPart);
router.patch('/:id', PartControllers.updatePart);
router.delete('/:id', PartControllers.deletePart);

export const PartRoutes = router;
