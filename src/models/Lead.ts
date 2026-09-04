import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
    name?: string;
    email?: string;
    phone?: string;
    message: string;
    source: string;
    createdAt: Date;
}

const LeadSchema: Schema = new Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    message: { type: String, required: true },
    source: { type: String, default: 'Website Chat Widget' },
    createdAt: { type: Date, default: Date.now }
});

export const Lead = mongoose.model<ILead>('Lead', LeadSchema);
