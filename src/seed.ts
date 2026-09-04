import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { CourseModule } from './models/CourseModule';
import { Review } from './models/Review';

dotenv.config();

const modulesData = [
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
