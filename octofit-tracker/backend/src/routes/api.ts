import { Router } from 'express';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const router = Router();

router.get('/users/', async (_request, response) => {
  response.json(await User.find().lean().exec());
});

router.get('/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').lean().exec());
});

router.get('/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user').lean().exec());
});

router.get('/leaderboard/', async (_request, response) => {
  response.json(await LeaderboardEntry.find()
    .populate('user')
    .populate('team')
    .sort({ rank: 1 })
    .lean()
    .exec());
});

router.get('/workouts/', async (_request, response) => {
  response.json(await Workout.find().populate('user').lean().exec());
});

export default router;
