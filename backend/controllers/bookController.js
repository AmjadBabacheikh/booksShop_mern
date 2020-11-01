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

export { getBooks, getBookById };
