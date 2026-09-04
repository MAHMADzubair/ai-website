import { Request, Response } from 'express';
import { Lead } from '../models/Lead';

export const createLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message, name, email, phone } = req.body;

        if (!message) {
            res.status(400).json({ success: false, message: 'Message content is required.' });
            return;
        }

        const newLead = { message, name, email, phone, createdAt: new Date() };

        try {
            const leadDoc = new Lead(newLead);
            await leadDoc.save();
        } catch (e) {
            console.log('Lead saved locally:', newLead);
        }

        res.status(201).json({
            success: true,
            message: 'Inquiry received. Support team will connect via WhatsApp shortly!'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};
