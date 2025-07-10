import express from 'express';
import {
  createUserPantryItem,
  getUserPantryItems,
  updateUserPantryItem,
  deleteUserPantryItem,
} from '../controllers/userpantrycontroller.js';

const router = express.Router();

router.post('/', createUserPantryItem);
router.get('/:userId', getUserPantryItems);
router.put('/:id', updateUserPantryItem);
router.delete('/:id', deleteUserPantryItem);

export default router;
