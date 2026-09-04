import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
    try {
        const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/ai_influencer_agency';
        console.log(`Connecting to MongoDB at: ${connStr}...`);
        
        await mongoose.connect(connStr, {
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout if MongoDB isn't running locally
        });

        console.log('✅ MongoDB Connected Successfully!');
    } catch (error) {
        console.warn('⚠️  MongoDB Connection Warning:', (error as Error).message);
        console.warn('💡 Tip: Running in fallback mode. In-memory data store will be used for API endpoints if database is offline.');
    }
};
