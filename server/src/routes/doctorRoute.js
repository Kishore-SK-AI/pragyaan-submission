import express from 'express';
import deletePatient from '../controllers/doctorController.js';
const router = express.Router();


router.delete('/patients', deletePatient);

export default router;