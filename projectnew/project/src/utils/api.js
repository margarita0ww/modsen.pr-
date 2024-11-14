import axios from 'axios';

const API_KEY = 'AIzaSyBazx0IQf9RMbKe5Gjl4yg98SjE0gFv3EE';
const API_URL = 'https://www.googleapis.com/books/v1/volumes';

// Функция для нормализации параметров поиска
const normalizeSearchParams = (query, category) => {
  return category !== 'all' ? `${query}+subject:${category}` : query;
};

// Асинхронная функция для получения списка книг
export const searchBooks = async (searchTerm, categoryFilter, sortOrder, pageIndex = 0) => {
  const params = {
    q: normalizeSearchParams(searchTerm, categoryFilter),
    orderBy: sortOrder,
    startIndex: pageIndex,
    maxResults: 30,
    key: API_KEY,
  };

  try {
    console.log('Fetching books with parameters:', params);
    const { data } = await axios.get(API_URL, { params });
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Функция для получения данных о книге по ID
export const getBookInfo = async (bookId) => {
  try {
    const { data } = await axios.get(`${API_URL}/${bookId}`, { params: { key: API_KEY } });
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Функция для обработки ошибок
const handleError = (error) => {
  console.error('An error occurred:', error);
  if (error.response) {
    console.error('Response data:', error.response.data);
  } else {
    console.error('Error message:', error.message);
  }
  throw new Error('Unable to process the request');
};

// Функция для получения всех доступных категорий книг
export const fetchCategories = async () => {
  // Пример статического списка категорий
  return [
    { value: 'all', label: 'Все категории' },
    { value: 'art', label: 'Искусство' },
    { value: 'biography', label: 'Биография' },
    { value: 'computers', label: 'Компьютеры' },
    { value: 'history', label: 'История' },
    { value: 'medical', label: 'Медицина' },
    { value: 'poetry', label: 'Поэзия' },
  ];
};