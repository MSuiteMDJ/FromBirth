import express, { Request, Response } from 'express';
import { mockDatabase, Consultation } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// GET all consultations (admin only in production)
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: mockDatabase.consultations,
    count: mockDatabase.consultations.length,
  });
});

// GET single consultation by ID
router.get('/:id', (req: Request, res: Response) => {
  const consultation = mockDatabase.consultations.find(
    (c) => c.id === req.params.id
  );

  if (!consultation) {
    return res.status(404).json({
      success: false,
      error: 'Consultation not found',
    });
  }

  res.json({
    success: true,
    data: consultation,
  });
});

// POST create consultation request
router.post('/', (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    preferredConsultDate,
    preferredConsultTime,
    medicalHistory,
    allergies,
    medications,
    treatmentInterest,
    clinicLocation,
    hasBloodWork,
    bloodWorkDate,
    canTravelToClinic,
    termsAccepted,
    privacyAccepted,
  } = req.body;

  // Validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !preferredConsultDate ||
    !preferredConsultTime
  ) {
    return res.status(400).json({
      success: false,
      error:
        'Missing required fields: firstName, lastName, email, phone, preferredConsultDate, preferredConsultTime',
    });
  }

  if (!termsAccepted || !privacyAccepted) {
    return res.status(400).json({
      success: false,
      error: 'Must accept terms and privacy policy',
    });
  }

  const newConsultation: Consultation = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    phone: phone || undefined,
    dateOfBirth: dateOfBirth || undefined,
    preferredConsultDate: preferredConsultDate || undefined,
    preferredConsultTime: preferredConsultTime || undefined,
    medicalHistory: medicalHistory || undefined,
    allergies: allergies || undefined,
    medications: medications || undefined,
    treatmentInterest,
    clinicLocation: clinicLocation || undefined,
    hasBloodWork:
      typeof hasBloodWork === 'boolean' ? hasBloodWork : undefined,
    bloodWorkDate: bloodWorkDate || undefined,
    canTravelToClinic:
      typeof canTravelToClinic === 'boolean' ? canTravelToClinic : undefined,
    termsAccepted,
    privacyAccepted,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockDatabase.consultations.push(newConsultation);

  // TODO: In production, send confirmation email via SendGrid
  console.log('📋 New consultation request:', newConsultation);

  res.status(201).json({
    success: true,
    data: newConsultation,
    message: 'Consultation request received. You will be contacted within 24 hours.',
  });
});

// PATCH update consultation status (admin only in production)
router.patch('/:id', (req: Request, res: Response) => {
  const consultation = mockDatabase.consultations.find(
    (c) => c.id === req.params.id
  );

  if (!consultation) {
    return res.status(404).json({
      success: false,
      error: 'Consultation not found',
    });
  }

  const { status, scheduledDate } = req.body;

  if (status) {
    consultation.status = status;
  }
  if (scheduledDate) {
    consultation.scheduledDate = scheduledDate;
  }

  consultation.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    data: consultation,
  });
});

export default router;
