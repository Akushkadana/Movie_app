import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchMovies,
  toggleLike,
  toggleFavorite,
  addRating,
  deleteMovie 
} from '../redux/moviesSlice';
import MovieForm from '../components/MovieForm';

const Movies = () => {
  const dispatch = useDispatch();
  const { movies = [], loading, error } = useSelector((state) => state.movies);

  const [showForm, setShowForm] = useState(false);
  const [editMovie, setEditMovie] = useState(null);

  // Загрузка фильмов при открытии страницы
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleAddClick = () => {
    setEditMovie(null);
    setShowForm(true);
  };

  const handleEditClick = (movie) => {
    setEditMovie(movie);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditMovie(null);
  };

  // Обработчики для новых функций
  const handleLike = (movieId) => {
    dispatch(toggleLike(movieId));
  };

  const handleFavorite = (movieId) => {
    dispatch(toggleFavorite(movieId));
  };

  const handleRating = (movieId, rating) => {
    dispatch(addRating({ movieId, rating }));
  };

  if (loading) return <p className="loading">Загрузка фильмов...</p>;
  if (error) return <p className="error">Ошибка: {error}</p>;

  return (
    <div className="movies-page">
      <div className="page-header">
        <h1>🎬 Список фильмов</h1>
        <button className="add-button" onClick={handleAddClick}>
          + Добавить новый фильм
        </button>
      </div>

      {showForm && (
        <MovieForm 
          existingMovie={editMovie} 
          onClose={handleCloseForm} 
        />
      )}

      {movies.length === 0 ? (
        <p className="no-movies">Пока нет фильмов. Добавьте первый! 🎥</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-card-content">
                <h3>{movie.title}</h3>
                {movie.year && <p className="year">Год: {movie.year}</p>}
                
                <p className="description">
                  {movie.description || "Описание отсутствует"}
                </p>

                {/* Средняя оценка */}
                <p className="average-rating">
                  ⭐ Средняя оценка: 
                  <strong> {movie.averageRating ? movie.averageRating.toFixed(1) : '—'}</strong>
                </p>

                {/* Лайки и Избранное */}
                <div className="actions-top">
                  <button 
                    className={`like-btn ${movie.likes > 0 ? 'liked' : ''}`}
                    onClick={() => handleLike(movie.id)}
                  >
                    ❤️ {movie.likes || 0}
                  </button>

                  <button 
                    className={`favorite-btn ${movie.isFavorite ? 'favorited' : ''}`}
                    onClick={() => handleFavorite(movie.id)}
                  >
                    {movie.isFavorite ? '⭐ В избранном' : '☆ В избранное'}
                  </button>
                </div>

                {/* Оценка звёздами */}
                <div className="rating-stars">
                  <span>Оценить фильм:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="star"
                      onClick={() => handleRating(movie.id, star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Кнопки редактирования и удаления */}
              <div className="movie-card-footer">
                <button 
                  className="edit-btn"
                  onClick={() => handleEditClick(movie)}
                >
                  Редактировать
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => dispatch(deleteMovie(movie.id))}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;