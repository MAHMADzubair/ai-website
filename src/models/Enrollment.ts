import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
    fullName: string;
    email: string;
    paymentMethod: string;
    plan: string;
    amount: number;
    status: 'Pending' | 'Completed' | 'Refunded';
    createdAt: Date;
}

const EnrollmentSchema: Schema = new Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    paymentMethod: { type: String, required: true },
    plan: { type: String, required: true, default: 'LaunchPad Standard' },
    amount: { type: Number, required: true, default: 133.99 },
    status: { type: String, enum: ['Pending', 'Completed', 'Refunded'], default: 'Completed' },
    createdAt: { type: Date, default: Date.now }
});

export const Enrollment = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
