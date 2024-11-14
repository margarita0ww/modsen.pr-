import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import BookCard from "./BookCard";
import Pagination from "./Pagination";

const API_KEY = "AIzaSyBazx0IQf9RMbKe5Gjl4yg98SjE0gFv3EE"; // Ваш ключ API
const API_URL = "https://www.googleapis.com/books/v1/volumes";

const BookList = () => {
  const [searchParams, setSearchParams] = useState({
    query: "",
    category: "all",
    sort: "relevance",
  });
  const [books, setBooks] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const { query, category, sort } = searchParams;
        const response = await axios.get(API_URL, {
          params: {
            q: query,
            filter: category !== "all" ? category : undefined,
            orderBy: sort === "newest" ? "newest" : undefined,
            startIndex: nextPageToken || 0,
            maxResults: 12,
            key: API_KEY,
          },
        });
        setBooks(prevBooks => [...prevBooks, ...(response.data.items || [])]);
        setTotalBooks(response.data.totalItems || 0);
        setNextPageToken(response.data.nextPageToken);
      } catch (error) {
        console.error("Ошибка загрузки книг", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchParams.query || searchParams.category !== "all") {
      loadBooks();
    }
  }, [searchParams, nextPageToken]);

  const handleLoadMore = () => {
    if (nextPageToken) {
      setNextPageToken(prev => prev);
    }
  };

  const handleResetSearch = () => {
    setSearchParams({ query: "", category: "all", sort: "relevance" });
    setBooks([]);
    setNextPageToken(null);
    setTotalBooks(0);
  };

  return (
    <div className="container mt-5">
      <SearchForm
        query={searchParams.query}
        setQuery={(query) => setSearchParams(prev => ({ ...prev, query }))}
        category={searchParams.category}
        setCategory={(category) => setSearchParams(prev => ({ ...prev, category }))}
        sort={searchParams.sort}
        setSort={(sort) => setSearchParams(prev => ({ ...prev, sort }))}
      />

      <div className="d-flex justify-content-between align-items-center mt-3">
        <h5>{totalBooks} книг найдено</h5>
        <button className="btn btn-secondary" onClick={handleResetSearch}>
          Сбросить поиск
        </button>
      </div>

      <div className="row g-4 mt-3">
        {loading ? (
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Загрузка...</span>
            </div>
          </div>
        ) : (
          books.map((book) => (
            <div className="col-md-3 col-sm-6" style={{ margin: 15 }} key={book.id}>
              <BookCard book={book} />
            </div>
          ))
        )}
      </div>

      {nextPageToken && !loading && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination onLoadMore={handleLoadMore} />
        </div>
      )}
    </div>
  );
};

export default BookList;