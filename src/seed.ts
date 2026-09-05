import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { CourseModule } from './models/CourseModule';
import { Review } from './models/Review';

dotenv.config();

const modulesData = [
    {
        moduleNumber: '01',
        title: 'What Is This Business & How To Start?',
        metaInfo: '1 Foundation Lesson • Agency Business Model Overview',
        order: 1,
        lessons: [
            { title: 'What Is This Business & How To Start?' }
        ]
    },
    {
        moduleNumber: '02',
        title: 'Social Media Warm-Up Strategy',
        metaInfo: '4 Lessons • TikTok, Instagram & Initial 200 Subscribers',
        order: 2,
        lessons: [
            { title: 'Warm Up Social Accounts & Get Your First 200 Subscribers' },
            { title: 'Social Media Warm-Up Strategy' },
            { title: 'TikTok Account Creation + Warm-Up Strategy' },
            { title: 'How to Create Instagram Account Professionally + Warm Up' }
        ]
    },
    {
        moduleNumber: '03',
        title: 'AI Influencer Mastery Program (2026 Updated)',
        metaInfo: '13 Core Lessons • Character Creation, ComfyUI, LoRAs & Fanvue',
        order: 3,
        lessons: [
            { title: 'Important — Read This First' },
            { title: 'First Download All the Data Here' },
            { title: 'Complete Proxy Setup & Social Media Account Creation' },
            { title: 'AI Content Creation (Part 1) – Character Creation & Workflow Setup' },
            { title: 'AI Content Creation (Part 2) – Advanced Image & Video Generation (SFW + NSFW)' },
            { title: 'AI Content Creation (Part 3) – Professional Content Pipeline & Automation' },
            { title: 'AI Product Hunting & Viral Video Creation' },
            { title: 'Professional LoRA Training & Character Consistency' },
            { title: 'Content Uploading & Platform Optimization' },
            { title: 'Social Media Growth & Audience Building' },
            { title: 'Fanvue Monetization & Live Selling Strategy' },
            { title: 'My 10+ Chase Templates of My Own Fans' },
            { title: 'Fanvue Chat' }
        ]
    },
    {
        moduleNumber: '04',
        title: 'Product Hunting Strategy for Amazon Affiliate',
        metaInfo: '2 Lessons • Passive Affiliate Income & High-Converting Offers',
        order: 4,
        lessons: [
            { title: 'Product Hunting Strategy (Amazon Affiliate)' },
            { title: 'Product Hunting Strategy (High-Converting Offer)' }
        ]
    },
    {
        moduleNumber: '05',
        title: 'How to Create SFW + NSFW Content (ComfyUI + Free & Paid Tools)',
        metaInfo: '4 Lessons • ComfyUI Workflows, Video & Image Pipeline',
        order: 5,
        lessons: [
            { title: 'How to Create SFW Content (ComfyUI + Tools)' },
            { title: 'How to Create SFW Content in ComfyUI + Workflow + Tools' },
            { title: 'Content Posting Strategy (AI Influencer Growth System)' },
            { title: 'SFW and NSFW Video & Image Creation' }
        ]
    },
    {
        moduleNumber: '06',
        title: 'More Ways to Create Content (Advanced NSFW Monetization)',
        metaInfo: '5 Lessons • CapCut Setup & High-Ticket Monetization',
        order: 6,
        lessons: [
            { title: 'How to Create NSFW Content (Advanced Monetization)' },
            { title: 'How to Create NSFW Content (Advanced Monetization) – Part 2' },
            { title: 'How to Create NSFW Content (Advanced Monetization) – Part 3' },
            { title: 'How to Create NSFW Content (Advanced Monetization) – Part 4 – CapCut Setup' },
            { title: 'How to Create NSFW Content (Advanced Monetization) – Part 5' }
        ]
    },
    {
        moduleNumber: '07',
        title: 'Account Setup: Payoneer, Fanvue & Amazon',
        metaInfo: '1 Essential Lesson • Banking, Payouts & Global Gateways',
        order: 7,
        lessons: [
            { title: 'Account Setup: Payoneer, Fanvue & Amazon (Step-by-step guidance)' }
        ]
    },
    {
        moduleNumber: '08',
        title: 'Your Daily Routine Setup?',
        metaInfo: '1 Agency Routine Lesson • Daily Time Management & Scaling',
        order: 8,
        lessons: [
            { title: 'Your Daily Routine Setup for Consistent Revenue & Output' }
        ]
    },
    {
        moduleNumber: '09',
        title: 'Next-Gen Workflows, Video Faceswap & Practical Chat',
        metaInfo: '5 Advanced Lessons • LTX, Gemma, Chat Automation & Future Workflows',
        order: 9,
        lessons: [
            { title: 'More Videos Coming Soon About More Ways of Creating Content and Making Money' },
            { title: 'New Workflows' },
            { title: 'Video Faceswap NSFW + SFW Using LTX and GEMMA' },
            { title: 'Practical Chat System' },
            { title: 'Practical Chat Flow with Proper Guidance' }
        ]
    }
];

const reviewsData = [
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
        text: 'Sir Rana Moon\'s guidance on targeting US traffic changed everything. The Discord community is super active and always shares fresh prompt recipes.'
    },
    {
        name: 'Muhammad Rizwan',
        avatarInitials: 'MR',
        role: 'AI Creator • Islamabad',
        rating: 5,
        text: 'Best investment I made this year. Clear, structured, and practical. I had no technical background but created my first AI model in just 2 days.'
    }
];

const seedData = async () => {
    try {
        const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/ai_influencer_agency';
        await mongoose.connect(connStr);
        console.log('Connected to MongoDB for seeding...');

        await CourseModule.deleteMany({});
        await Review.deleteMany({});

        await CourseModule.insertMany(modulesData);
        await Review.insertMany(reviewsData);

        console.log('✅ MongoDB Data Seeded Successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
