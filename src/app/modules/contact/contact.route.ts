import express from 'express';
import { ContactSubmissionController } from './contact.controller';
const router = express.Router();

router.post('/', ContactSubmissionController.createContactSubmission);
router.get('/', ContactSubmissionController.getAllContactSubmissions);
router.get('/:id', ContactSubmissionController.getContactSubmissionById);
router.patch('/:id/status', ContactSubmissionController.updateContactSubmissionStatus);
router.patch('/:id/respond', ContactSubmissionController.respondToContactSubmission);
router.delete('/:id', ContactSubmissionController.deleteContactSubmission);

export const ContactSubmissionRoutes = router;