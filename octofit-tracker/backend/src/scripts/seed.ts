import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const users = await Promise.all([
      User.findOneAndUpdate(
        { email: 'maya.chen@example.com' },
        { $set: { name: 'Maya Chen' } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { email: 'leo.martinez@example.com' },
        { $set: { name: 'Leo Martinez' } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { email: 'amina.johnson@example.com' },
        { $set: { name: 'Amina Johnson' } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { email: 'noah.kim@example.com' },
        { $set: { name: 'Noah Kim' } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
    ]);

    const teams = await Promise.all([
      Team.findOneAndUpdate(
        { name: 'Trail Blazers' },
        {
          $set: {
            description: 'Outdoor-minded teammates building endurance together.',
            members: [users[0]._id, users[1]._id],
          },
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      Team.findOneAndUpdate(
        { name: 'City Sprinters' },
        {
          $set: {
            description: 'A city crew focused on consistent movement and speed.',
            members: [users[2]._id, users[3]._id],
          },
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
    ]);

    await Promise.all([
      User.updateOne({ _id: users[0]._id }, { $set: { team: teams[0]._id } }),
      User.updateOne({ _id: users[1]._id }, { $set: { team: teams[0]._id } }),
      User.updateOne({ _id: users[2]._id }, { $set: { team: teams[1]._id } }),
      User.updateOne({ _id: users[3]._id }, { $set: { team: teams[1]._id } }),
    ]);

    const activitySamples = [
      { user: users[0], type: 'Run', durationMinutes: 35, distanceKm: 5.2, calories: 340, date: '2026-10-01' },
      { user: users[0], type: 'Strength training', durationMinutes: 45, calories: 280, date: '2026-10-03' },
      { user: users[1], type: 'Hike', durationMinutes: 75, distanceKm: 7.8, calories: 520, date: '2026-10-02' },
      { user: users[1], type: 'Cycling', durationMinutes: 40, distanceKm: 14, calories: 390, date: '2026-10-04' },
      { user: users[2], type: 'Run', durationMinutes: 28, distanceKm: 4.1, calories: 270, date: '2026-10-01' },
      { user: users[2], type: 'Yoga', durationMinutes: 50, calories: 180, date: '2026-10-05' },
      { user: users[3], type: 'Cycling', durationMinutes: 55, distanceKm: 19, calories: 480, date: '2026-10-02' },
      { user: users[3], type: 'Run', durationMinutes: 32, distanceKm: 5, calories: 325, date: '2026-10-06' },
    ];
    await Activity.bulkWrite(activitySamples.map(({ user, ...activity }) => ({
      updateOne: {
        filter: { user: user._id, type: activity.type, date: new Date(activity.date) },
        update: { $setOnInsert: { user: user._id, ...activity, date: new Date(activity.date) } },
        upsert: true,
      },
    })));

    const leaderboardSamples = [
      { user: users[0], team: teams[0], score: 625, rank: 1 },
      { user: users[1], team: teams[0], score: 540, rank: 2 },
      { user: users[2], team: teams[1], score: 490, rank: 3 },
      { user: users[3], team: teams[1], score: 430, rank: 4 },
    ];
    await LeaderboardEntry.bulkWrite(leaderboardSamples.map(({ user, team, score, rank }) => ({
      updateOne: {
        filter: { user: user._id },
        update: { $set: { team: team._id, score, rank } },
        upsert: true,
      },
    })));

    const workoutSamples = [
      {
        title: 'Beginner 5K Builder',
        description: 'A steady run-walk session to build aerobic endurance.',
        category: 'Cardio',
        user: users[0],
      },
      {
        title: 'Full-Body Strength Circuit',
        description: 'A balanced circuit with bodyweight squats, push-ups, and planks.',
        category: 'Strength',
        user: users[1],
      },
      {
        title: 'Mobility and Recovery Flow',
        description: 'A gentle sequence to improve flexibility and recover after training.',
        category: 'Recovery',
        user: users[2],
      },
      {
        title: 'Tempo Ride Intervals',
        description: 'A cycling workout alternating moderate and challenging efforts.',
        category: 'Cycling',
        user: users[3],
      },
    ];
    await Workout.bulkWrite(workoutSamples.map(({ user, ...workout }) => ({
      updateOne: {
        filter: { title: workout.title },
        update: { $set: { ...workout, user: user._id } },
        upsert: true,
      },
    })));

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
