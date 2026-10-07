import { model, Schema, Types } from 'mongoose';

export interface Activity {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  calories?: number;
  date: Date;
}

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default model<Activity>('Activity', activitySchema);
