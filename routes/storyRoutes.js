import express from 'express';
const router = express.Router();
import { createStory,getAllUserStories, getAllStories, getStory, updateStory, deleteStory, addChapterToStory } from '../controllers/storyController.js';
import {protect} from '../middleware/authMiddleware.js'
// Create a new story
router.post('/stories',protect, createStory);

// Get all stories
router.get('/stories', protect, getAllStories);

// Get all user stories
router.get('/userstories/:id', protect, getAllUserStories);

// Get a specific story
router.get('/stories/:id',protect, getStory);

// Update a story
router.put('/stories/:id',protect, updateStory);

// Delete a story
router.delete('/stories/:id',protect, deleteStory);

// Add a new chapter to a story
router.post('/stories/:id/chapters',protect, addChapterToStory);

export default router;
