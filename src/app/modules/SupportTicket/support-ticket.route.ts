import express from 'express';
import { SupportTicketController } from './support-ticket.controller';
const router = express.Router();

router.post('/', SupportTicketController.createSupportTicket);
router.get('/', SupportTicketController.getAllSupportTickets);
router.get('/:id', SupportTicketController.getSupportTicketById);
router.patch('/:id/status', SupportTicketController.updateSupportTicketStatus);
router.delete('/:id', SupportTicketController.deleteSupportTicket);

export const SupportTicketRoutes = router;