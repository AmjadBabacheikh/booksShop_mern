import mongoose from 'mongoose';
import Book from '../models/bookModel.js';
import asyncHandler from 'express-async-handler';

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404).json({ message: 'book not found' });
  } else {
    res.json(book);
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (book) {
    await book.remove();
    res.json({ message: 'book removed ' });
  } else {
    res.status(404);
    throw new Error('book not found');
  }
});

export { getBooks, getBookById, deleteBook };
