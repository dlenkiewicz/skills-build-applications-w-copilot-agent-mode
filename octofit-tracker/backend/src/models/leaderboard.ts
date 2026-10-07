import { model, Schema, Types } from 'mongoose';

export interface LeaderboardEntry {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export default model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
