import express from 'express';
const router = express.Router();
import { authUser,createUser, getAllUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js'

router.post('/auth', authUser)

// Create a new user
router.post('/users', createUser);

// Get all users
router.get('/users',protect, getAllUsers);

// Get a specific user
router.get('/users/:id',protect, getUser);

// Update a user
router.put('/users/:id',protect, updateUser);

// Delete a user
router.delete('/users/:id',protect, deleteUser);

export default router;
