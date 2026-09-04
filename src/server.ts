import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';
import apiRoutes from './routes/apiRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
const publicPath = path.resolve('public');
app.use(express.static(publicPath));

// API Routes
app.use('/api', apiRoutes);

// Fallback route for SPA / index
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Start Server locally if not running on Vercel Serverless
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`==================================================`);
        console.log(`🚀 SWIFTY AI STUDIO Express Server Active!`);
        console.log(`🌐 Server running at: http://localhost:${PORT}`);
        console.log(`==================================================`);
    });
}

export default app;
