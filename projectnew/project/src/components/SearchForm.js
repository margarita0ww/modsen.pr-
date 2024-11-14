import React from 'react';

const SearchForm = ({ query, setQuery, category, setCategory, sort, setSort, onSearch }) => {
  // Обрабатываем нажатие клавиши Enter для запуска поиска
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Предотвращаем отправку формы
      onSearch(); // Запуск поиска
    }
  };

  // Обрабатываем отправку формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    onSearch(); // Запуск поиска при нажатии на кнопку
  };

  // Функция для сброса введённых данных и фильтров
  const handleReset = () => {
    setQuery(''); // Сбрасываем текст запроса
    setCategory('all'); // Сбрасываем выбранную категорию
    setSort('relevance'); // Сбрасываем сортировку
  };

  return (
    <form onSubmit={handleSubmit} className="search-form d-flex flex-column align-items-stretch mb-4">
      {/* Поле ввода для запроса */}
      <div className="mb-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Обновляем состояние query
          onKeyDown={handleKeyPress} // Запуск поиска при нажатии клавиши Enter
          placeholder="Введите название книги..."
          className="form-control"
        />
        {/* Подсказка для поля ввода */}
        <small className="text-success">Введите название книги, автора или ключевые слова.</small>
      </div>
      
      {/* Группа селекторов для категории и сортировки */}
      <div className="d-flex justify-content-between mb-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Обновляем фильтр категории
          className="form-select me-2"
        >
          <option value="all">Все категории</option>
          <option value="art">Искусство</option>
          <option value="biography">Биография</option>
          <option value="computers">Компьютеры</option>
          <option value="history">История</option>
          <option value="medical">Медицина</option>
          <option value="poetry">Поэзия</option>
        </select>
        {/* Подсказка для селектора категории */}
        <small className="text-success">Выберите категорию для фильтрации результатов.</small>
        
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)} // Обновляем фильтр сортировки
          className="form-select"
        >
          <option value="relevance">По релевантности</option>
          <option value="newest">По новизне</option>
        </select>
        {/* Подсказка для селектора сортировки */}
        <small className="text-success">Выберите порядок сортировки результатов.</small>
      </div>

      {/* Кнопки для поиска и сброса */}
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary me-2">
          Найти
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Сбросить
        </button>
      </div>
    </form>
  );
};

export default SearchForm;