import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import { listTopRatedBooks } from '../actions/bookActions';
import { Link } from 'react-router-dom';

const BookCarousel = () => {
  const Dispatch = useDispatch();
  const topRatedBook = useSelector((state) => state.topRatedBook);
  const { Loading, books, error } = topRatedBook;
  useEffect(() => {
    Dispatch(listTopRatedBooks());
  }, [Dispatch]);

  return Loading ? (
    <Loader />
  ) : error ? (
    <Message varaint='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary my-2'>
      {books.map((book) => (
        <Carousel.Item key={book._id}>
          <Link to={`/books/${book._id}`}>
            <Image src={book.image} alt={book.title} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {book.title} <span className='px-1'>{book.price}€</span>
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BookCarousel;
