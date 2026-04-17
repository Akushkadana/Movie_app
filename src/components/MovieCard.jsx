import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleLike, toggleFavorite, addRating, deleteMovie } from '../redux/moviesSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  return (
    <div className="movie-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      
      <button onClick={() => dispatch(toggleLike(movie.id))}>❤️ {movie.likes}</button>
      
      <button onClick={() => dispatch(toggleFavorite(movie.id))}>
        {movie.isFavorite ? '⭐ В избранном' : ' ☆ В избранное'}
      </button>

      <div style={{ margin: '10px 0' }}>
        <span>Оценить: </span>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => dispatch(addRating({ movieId: movie.id, rating: n }))}>{n}</button>
        ))}
      </div>

      <p>Рейтинг: <strong>{movie.averageRating || 0}</strong></p>
      
      <button onClick={() => dispatch(deleteMovie(movie.id))} style={{ color: 'red' }}>Удалить</button>
    </div>
  );
};

export default MovieCard;