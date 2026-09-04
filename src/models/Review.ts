import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
    name: string;
    avatarInitials: string;
    role: string;
    rating: number;
    text: string;
    verifiedStudent: boolean;
    createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
    name: { type: String, required: true },
    avatarInitials: { type: String, required: true },
    role: { type: String, required: true },
    rating: { type: Number, default: 5 },
    text: { type: String, required: true },
    verifiedStudent: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
