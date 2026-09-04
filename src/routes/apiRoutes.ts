import { Router } from 'express';
import { getCourseModules, getAgencyStats } from '../controllers/courseController';
import { createEnrollment, getEnrollments } from '../controllers/enrollmentController';
import { getReviews } from '../controllers/reviewController';
import { createLead } from '../controllers/leadController';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'SWIFTY AI STUDIO API is online' });
});

// Course & Stats Endpoints
router.get('/modules', getCourseModules);
router.get('/stats', getAgencyStats);

// Enrollments Endpoints
router.post('/enroll', createEnrollment);
router.get('/enrollments', getEnrollments);

// Reviews & Support Leads Endpoints
router.get('/reviews', getReviews);
router.post('/leads', createLead);

export default router;
