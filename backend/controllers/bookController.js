import mongoose from 'mongoose';
import Book from '../models/bookModel.js';
import asyncHandler from 'express-async-handler';

const getBooks = asyncHandler(async (req, res) => {
  const bookPerPage = 10;
  const page = Number(req.query.pageNumber) || 1;
  const key = req.query.key
    ? {
        title: {
          $regex: req.query.key,
          $options: 'i',
        },
      }
    : {};
  const count = await Book.countDocuments({ ...key });
  const books = await Book.find({ ...key })
    .limit(bookPerPage)
    .skip(bookPerPage * (page - 1));
  res.json({ books, page, pages: Math.ceil(count / bookPerPage) });
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

const updateBookToReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const book = await Book.findById(req.params.id);
  if (book) {
    const hasReviewd = book.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (hasReviewd) {
      res.status(400);
      throw new Error('already reviewed');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    book.reviews.push(review);
    book.numReviews = book.reviews.length;
    book.rating =
      book.reviews.reduce((acc, item) => item.rating + acc, 0) /
      book.reviews.length;
    const updatedBook = await book.save();
    res.status(201);
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('book not founded');
  }
});

const getTopBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).sort({ rating: -1 }).limit(4);
  res.json(books);
});

export {
  getBooks,
  getBookById,
  deleteBook,
  updateBookById,
  createBook,
  updateBookToReview,
  getTopBooks,
};
