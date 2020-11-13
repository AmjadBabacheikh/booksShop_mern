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

const updateBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    book.title = req.body.title || book.title;
    book.description = req.body.description || book.description;
    book.image = req.body.image || book.image;
    book.author = req.body.author || book.author;
    book.category = req.body.category || book.category;
    book.language = req.body.language || book.language;
    book.price = req.body.price || book.price;
    book.countInStock = req.body.countInStock || book.countInStock;
    book.year = req.body.year || book.year;
    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('book not founded');
  }
});

const createBook = asyncHandler(async (req, res) => {
  const {
    title,
    author,
    language,
    year,
    countInStock,
    category,
    image,
    price,
    description,
    rating,
  } = req.body;
  const book = new Book({
    title,
    author,
    language,
    year,
    countInStock,
    category,
    image,
    price,
    description,
    rating,
    user: req.user._id,
  });
  const createdBook = await book.save();
  if (createdBook) {
    res.status(201);
    res.json(createdBook);
  } else {
    res.status(400);
    throw new Error('wrong book data');
  }
});

export { getBooks, getBookById, deleteBook, updateBookById, createBook };
