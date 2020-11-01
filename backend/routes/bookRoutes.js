import express from 'express';
const router = express.Router();
import { getBookById, getBooks } from '../controllers/bookController.js';

router.get('/', getBooks);
router.get('/:id', getBookById);

export default router;
