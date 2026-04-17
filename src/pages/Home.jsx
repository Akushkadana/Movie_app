import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';

const Home = () => {
  // Достаем список фильмов из стейта
  const movies = useSelector((state) => state.movies.list);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Моя Кинотека</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;