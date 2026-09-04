import { Request, Response } from 'express';
import { Review } from '../models/Review';

const defaultReviews = [
    {
        name: 'Ali Hassan',
        avatarInitials: 'AH',
        role: 'Agency Founder • Lahore',
        rating: 5,
        text: 'The ComfyUI face consistency workflow alone saved me months of trial and error. My AI model reached 45k followers on IG in under 3 weeks, and we hit $3,200 on Fanvue in our first month!'
    },
    {
        name: 'Shahid Khan',
        avatarInitials: 'SK',
        role: 'Digital Entrepreneur • Karachi',
        rating: 5,
        text: 'Sir Muhammad Adeel\'s guidance on targeting US traffic changed everything. The Discord community is super active and always shares fresh prompt recipes.'
    },
    {
        name: 'Muhammad Rizwan',
        avatarInitials: 'MR',
        role: 'AI Creator • Islamabad',
        rating: 5,
        text: 'Best investment I made this year. Clear, structured, and practical. I had no technical background but created my first AI model in just 2 days.'
    }
];

export const getReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        let reviews = await Review.find().sort({ createdAt: -1 });
        if (!reviews || reviews.length === 0) {
            reviews = defaultReviews as any;
        }
        res.status(200).json({ success: true, count: reviews.length, data: reviews });
    } catch (error) {
        res.status(200).json({ success: true, count: defaultReviews.length, data: defaultReviews });
    }
};
