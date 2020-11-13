import express from 'express';
const router = express.Router();
import {
  getBookById,
  getBooks,
  deleteBook,
  updateBookById,
  createBook,
} from '../controllers/bookController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', protect, isAdmin, createBook);
router
  .route('/:id')
  .delete(protect, isAdmin, deleteBook)
  .put(protect, isAdmin, updateBookById);

export default router;
