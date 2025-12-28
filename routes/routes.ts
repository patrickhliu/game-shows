import express from 'express';
import { getYears, getEpisodes, getQuestions } from '../controllers/JeopardyController.ts';
const router = express.Router();

router.get('/jeopardy/years', getYears);
router.get('/jeopardy/episodes/:year', getEpisodes);
router.get('/jeopardy/questions/:show_no', getQuestions);


export default router;