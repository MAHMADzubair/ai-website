import { Request, Response } from 'express';
import { Enrollment } from '../models/Enrollment';

const inMemoryEnrollments: any[] = [];

export const createEnrollment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, email, paymentMethod, plan } = req.body;

        if (!fullName || !email || !paymentMethod) {
            res.status(400).json({ success: false, message: 'Please provide full name, email, and payment method.' });
            return;
        }

        const amount = plan && plan.includes('Mentorship') ? 25000 : 8999;

        const newRecord = {
            fullName,
            email,
            paymentMethod,
            plan: plan || 'SWIFTY AI STUDIO Standard',
            amount,
            currency: 'PKR',
            status: 'Completed',
            createdAt: new Date()
        };

        try {
            const enrollmentDoc = new Enrollment(newRecord);
            await enrollmentDoc.save();
            res.status(201).json({
                success: true,
                message: 'Enrollment successful! Welcome to SWIFTY AI STUDIO.',
                data: enrollmentDoc
            });
        } catch (dbErr) {
            inMemoryEnrollments.push({ ...newRecord, _id: Date.now().toString() });
            res.status(201).json({
                success: true,
                message: 'Enrollment successful! Welcome to SWIFTY AI STUDIO.',
                data: newRecord
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const getEnrollments = async (req: Request, res: Response): Promise<void> => {
    try {
        let list = await Enrollment.find().sort({ createdAt: -1 });
        if (!list || list.length === 0) {
            list = inMemoryEnrollments as any;
        }
        res.status(200).json({ success: true, count: list.length, data: list });
    } catch (error) {
        res.status(200).json({ success: true, count: inMemoryEnrollments.length, data: inMemoryEnrollments });
    }
};
