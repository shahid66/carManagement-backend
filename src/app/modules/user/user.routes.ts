import express from 'express';
import auth from '../../middleware/auth';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/register', UserControllers.createUser);
router.put(
  '/update-user/:userId',
  auth('admin', 'engineer', 'helper', 'manager', 'technician'),
  UserControllers.updateUserDetails,
);

export const UserRoutes = router;
