import React from 'react';
import { Link } from 'react-router-dom'; 

const BookCard = ({ book }) => {
  const { volumeInfo } = book;
  const { title, authors, categories, imageLinks } = volumeInfo;

  return (
    <div
      className="card shadow-sm border"
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '20px 40px',
        padding: '15px',
      }}
    >
      {imageLinks?.thumbnail && (
        <img
          src={imageLinks.thumbnail}
          alt={`Обложка книги: ${title}`}
          className="card-img-top"
          style={{
            height: '200px',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
          {title}
        </h5>
        <p className="card-text">
          <strong>Авторы: </strong>{authors?.length ? authors.join(', ') : 'Неизвестно'}
        </p>
        <p className="card-text">
          <strong>Категории: </strong>{categories?.length ? categories[0] : 'Не указано'}
        </p>
        <Link to={`/book/${book.id}`} className="btn btn-primary">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default BookCard;