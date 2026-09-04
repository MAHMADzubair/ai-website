import { Request, Response } from 'express';
import { CourseModule } from '../models/CourseModule';
import { Enrollment } from '../models/Enrollment';

const defaultModules = [
    {
        moduleNumber: '01',
        title: 'Module 1: Foundations & AI Character Creation',
        metaInfo: '7 Lessons • Prompts & Workflows',
        order: 1,
        lessons: [
            { title: 'Understanding the AI Influencer Market & Niche Selection' },
            { title: 'Midjourney v6 & Flux 1.1 Model Generation Secrets' },
            { title: 'Face Consistency Masterclass: Maintaining Identity across 1,000s of photos' },
            { title: 'Setting Up ComfyUI & Automatic1111 on Free vs Paid Cloud GPUs' },
            { title: 'Creating Custom LoRAs for Unique Faces & Body Types' }
        ]
    },
    {
        moduleNumber: '02',
        title: 'Module 2: AI Video Generation & Animation',
        metaInfo: '8 Lessons • Runway, Kling & LivePortrait',
        order: 2,
        lessons: [
            { title: 'Animating Static AI Images into Realistic Talking Videos' },
            { title: 'Lip Syncing & Voice Cloning with ElevenLabs' },
            { title: 'Video-to-Video Motion Transfer for Viral Dance Trends' },
            { title: 'Runway Gen-3 & Kling AI Prompt Engineering for Smooth Motion' }
        ]
    },
    {
        moduleNumber: '03',
        title: 'Module 3: Social Media Growth & Audience Targeting',
        metaInfo: '9 Lessons • US Traffic & Algorithm Secrets',
        order: 3,
        lessons: [
            { title: 'How to Target High-Paying Tier-1 Audiences (US, UK, CA, AU)' },
            { title: 'Instagram Reels Algorithm Hacking for Rapid Growth' },
            { title: 'TikTok Warmup & Shadowban Prevention Protocols' },
            { title: 'Automated Posting & Scheduling Pipeline Setup' }
        ]
    },
    {
        moduleNumber: '04',
        title: 'Module 4: Monetization Funnels & High-Ticket Earnings',
        metaInfo: '10 Lessons • Fanvue, OnlyFans, Amazon & Sponsorships',
        order: 4,
        lessons: [
            { title: 'Setting Up Fanvue & Dfans Subscription Platforms' },
            { title: 'High-Converting Pay-Per-View (PPV) & Chat Sales Systems' },
            { title: 'Amazon Influencer Program & Fashion Affiliate Commission' },
            { title: 'Pitching & Closing Brand Collaborations' }
        ]
    },
    {
        moduleNumber: '05',
        title: 'Module 5: Scaling, Automation & Agency Legal Setup',
        metaInfo: '6 Lessons • SOPs & Payment Gateways',
        order: 5,
        lessons: [
            { title: 'Managing Multiple AI Influencers Simultaneously' },
            { title: 'International Payment Gateways & Banking Setup' },
            { title: 'Hiring VAs & Chatters to Run Your Business 100% Hands-Free' }
        ]
    }
];

export const getCourseModules = async (req: Request, res: Response): Promise<void> => {
    try {
        let modules = await CourseModule.find().sort({ order: 1 });
        if (!modules || modules.length === 0) {
            modules = defaultModules as any;
        }
        res.status(200).json({ success: true, count: modules.length, data: modules });
    } catch (error) {
        res.status(200).json({ success: true, count: defaultModules.length, data: defaultModules });
    }
};

export const getAgencyStats = async (req: Request, res: Response): Promise<void> => {
    try {
        let totalEnrollments = 1240;
        let totalRevenue = 1800000;

        try {
            const dbCount = await Enrollment.countDocuments();
            if (dbCount > 0) totalEnrollments += dbCount;
        } catch (e) {}

        res.status(200).json({
            success: true,
            data: {
                totalRevenue,
                totalStudents: totalEnrollments,
                satisfactionRate: 98.5,
                supportAvailability: '24/7'
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};
