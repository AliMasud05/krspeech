import express from 'express';
import { TeamController } from './team.controller';
const router = express.Router();

router.post('/', TeamController.createTeam);
router.get('/', TeamController.getAllTeams);
router.get('/:id', TeamController.getTeamById);
router.patch('/:id', TeamController.updateTeam);
router.delete('/:id', TeamController.deleteTeam);

export const TeamRoutes = router;