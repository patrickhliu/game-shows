import express from 'express';
import { helloWorld } from '../controllers/JeopardyController.ts';
const router = express.Router();

router.get('/jeopardy/years', helloWorld);


export default router;