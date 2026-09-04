import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson {
    title: string;
    duration?: string;
    isPreview?: boolean;
}

export interface ICourseModule extends Document {
    moduleNumber: string;
    title: string;
    metaInfo: string;
    lessons: ILesson[];
    order: number;
}

const CourseModuleSchema: Schema = new Schema({
    moduleNumber: { type: String, required: true },
    title: { type: String, required: true },
    metaInfo: { type: String, required: true },
    lessons: [{
        title: { type: String, required: true },
        duration: { type: String },
        isPreview: { type: Boolean, default: false }
    }],
    order: { type: Number, default: 1 }
});

export const CourseModule = mongoose.model<ICourseModule>('CourseModule', CourseModuleSchema);
