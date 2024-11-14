import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchBooks } from './utils/api';
import SearchForm from './components/SearchForm';
import BookCard from './components/BookCard';
import Pagination from './components/Pagination';
import BookDetail from './components/BookDetail';
import './styles/styles.css';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortingOption, setSortingOption] = useState('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const performSearch = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetchBooks(searchTerm, categoryFilter, sortingOption, 0);
      setBooks(response.items || []);
      setTotalResults(response.totalItems);
      setCurrentPage(1);
    } catch {
      setErrorMessage('Unable to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetchBooks(searchTerm, categoryFilter, sortingOption, currentPage * 30);
      setBooks((prevBooks) => [...prevBooks, ...response.items]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch {
      setErrorMessage('Unable to load more books.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>Discover Your Next Read</h1>
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortingOption={sortingOption}
          setSortingOption={setSortingOption}
          onSearch={performSearch}
        />
      </header>

      {isLoading && <div className="loading-spinner">Loading...</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <section className="book-results">
        <h2>Found {totalResults} books</h2>
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        {totalResults > books.length && (
          <Pagination loadMore={loadMoreBooks} />
        )}
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;