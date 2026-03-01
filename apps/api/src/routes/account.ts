import express, { Response } from 'express';
import { mockDatabase } from '../db.js';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);

router.get('/profile', (req: AuthenticatedRequest, res: Response) => {
  const user = req.authUser!;

  res.json({
    success: true,
    data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});

router.get('/appointments', (req: AuthenticatedRequest, res: Response) => {
  const user = req.authUser!;
  const now = new Date();
  const dueMax = new Date();
  dueMax.setDate(dueMax.getDate() + 30);

  const userAppointments = mockDatabase.appointments.filter(
    (item) => item.userId === user.id
  );

  const due = userAppointments
    .filter((item) => {
      if (item.status !== 'scheduled') {
        return false;
      }
      const scheduledAt = new Date(item.scheduledDate);
      return scheduledAt >= now && scheduledAt <= dueMax;
    })
    .sort(
      (a, b) =>
        new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
    );

  const dueIds = new Set(due.map((item) => item.id));
  const history = userAppointments
    .filter((item) => !dueIds.has(item.id))
    .sort(
      (a, b) =>
        new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
    );

  res.json({
    success: true,
    data: {
      due,
      history,
    },
  });
});

router.get('/orders', (req: AuthenticatedRequest, res: Response) => {
  const user = req.authUser!;

  const userOrders = mockDatabase.orders.filter(
    (item) => item.userId === user.id || item.email === user.email
  );

  const processingStatuses = new Set(['pending', 'shipped']);
  const historyStatuses = new Set(['delivered', 'cancelled', 'completed']);

  const processing = userOrders
    .filter((item) => processingStatuses.has(item.status))
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

  const history = userOrders
    .filter((item) => historyStatuses.has(item.status))
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

  res.json({
    success: true,
    data: {
      processing,
      history,
    },
  });
});

export default router;
