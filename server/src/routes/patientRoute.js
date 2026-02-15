import { Router } from 'express';
const router = Router();
import { getTotalPatients, getAllPatients, createPatient, createPatientAndAIAnalysis } from '../controllers/patientController.js';
import { authenticate } from '../middleware/authMiddleware.js';

// Get total number of patients
router.get('/total', getTotalPatients);

// Get all patients
router.get('/', authenticate, getAllPatients);

// Create a new patient
router.post('/', authenticate, createPatient);

router.post('/register', createPatientAndAIAnalysis);
export default router;
