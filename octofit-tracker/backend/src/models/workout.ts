import { model, Schema, Types } from 'mongoose';

export interface Workout {
  title: string;
  description: string;
  category?: string;
  user?: Types.ObjectId;
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: { type: String, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default model<Workout>('Workout', workoutSchema);
