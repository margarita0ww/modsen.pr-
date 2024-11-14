import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { fetchBookById } from '../utils/api'; 
import { Button } from 'react-bootstrap';

const BookDetail = () => {
  const { id } = useParams(); 
  const [bookDetails, setBookDetails] = useState({ book: null, loading: true, error: null });

  useEffect(() => {
    const loadBookDetails = async () => {
      try {
        setBookDetails(prev => ({ ...prev, loading: true }));
        const bookData = await fetchBookById(id); 
        setBookDetails({ book: bookData, loading: false, error: null });
      } catch (err) {
        setBookDetails({ book: null, loading: false, error: 'Ошибка загрузки книги. Попробуйте позже.' });
      }
    };

    loadBookDetails();
  }, [id]);

  const { book, loading, error } = bookDetails;

  if (loading) return <div className="text-center">Загрузка...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!book) return <div>Книга не найдена.</div>;

  
  const { volumeInfo } = book;
  const { title, authors, categories, description, imageLinks } = volumeInfo;

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '20px' }}>
      <div style={{ margin: '20px auto', maxWidth: '800px', border: '2px solid #ccc', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div className="book-detail" style={{ display: 'grid', placeItems: 'center', padding: '20px' }}>
          <h1 style={{ textAlign: 'center', color: '#333' }}>{title}</h1>
          {imageLinks?.thumbnail && (
            <img
              src={imageLinks.thumbnail}
              alt={`Обложка книги: ${title}`}
              style={{ width: '250px', height: 'auto', marginBottom: '15px', borderRadius: '5px' }}
            />
          )}
          <p><strong>Автор(ы):</strong> {authors?.length ? authors.join(', ') : 'Неизвестно'}</p>
          <p><strong>Категория:</strong> {categories?.length ? categories.join(', ') : 'Не указано'}</p>
          <p><strong>Описание:</strong> {description || 'Описание отсутствует'}</p>
          <Link to="/" style={{ textDecoration: 'none', marginTop: '20px' }}>
            <Button variant="primary">Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;