import express from 'express';
import { teamController } from './team.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
  '/',
//   auth(UserRole.ADMIN),
  teamController.create
);

router.get(
  '/',
//   auth(UserRole.ADMIN, UserRole.USER), // Add appropriate roles or remove if public
  teamController.getAll
);

router.get(
  '/:id',
  auth(UserRole.ADMIN, UserRole.USER), // Add appropriate roles or remove if public
  teamController.getById
);

router.put(
  '/:id',
//   auth(UserRole.ADMIN),
  teamController.update
);

router.delete(
  '/:id',
//   auth(UserRole.ADMIN),
  teamController.delete
);

export const teamRoutes = router;