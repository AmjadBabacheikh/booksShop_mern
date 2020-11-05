import express from 'express';
const router = express.Router();
import {
  getBookById,
  getBooks,
  deleteBook,
} from '../controllers/bookController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

router.get('/', getBooks);
router.get('/:id', getBookById);

router.route('/:id').delete(protect, isAdmin, deleteBook);

export default router;
