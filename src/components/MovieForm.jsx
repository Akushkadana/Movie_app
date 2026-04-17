import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie, updateMovie } from '../redux/moviesSlice';

const MovieForm = ({ existingMovie = null, onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [director, setDirector] = useState('');
  const [genres, setGenres] = useState('');
  const [description, setDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [quote, setQuote] = useState('');
  const [cast, setCast] = useState('');

  useEffect(() => {
    if (existingMovie) {
      setTitle(existingMovie.title || '');
      setYear(existingMovie.year || '');
      setRating(existingMovie.rating || '');
      setDirector(existingMovie.director || '');
      setGenres(existingMovie.genres?.join(', ') || '');
      setDescription(existingMovie.description || '');
      setPosterUrl(existingMovie.posterUrl || '');
      setQuote(existingMovie.quote || '');
      setCast(existingMovie.cast || '');
    }
  }, [existingMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const movieData = {
      title,
      year: Number(year),
      rating: Number(rating),
      director,
      genres: genres.split(',').map(g => g.trim()),
      description,
      posterUrl,
      quote,
      cast,
    };

    if (existingMovie) {
      dispatch(updateMovie({ id: existingMovie.id, ...movieData }));
    } else {
      dispatch(addMovie(movieData));
    }
    onClose();
  };

  return (
    <div className="movie-form">
      <h2>{existingMovie ? 'Редактировать фильм' : 'Добавить фильм'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Название" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="number" placeholder="Год" value={year} onChange={e => setYear(e.target.value)} required />
        <input type="number" step="0.1" placeholder="Рейтинг (например 8.1)" value={rating} onChange={e => setRating(e.target.value)} required />
        <input type="text" placeholder="Режиссёр" value={director} onChange={e => setDirector(e.target.value)} />
        <input type="text" placeholder="Жанры (через запятую)" value={genres} onChange={e => setGenres(e.target.value)} />
        <textarea placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="url" placeholder="URL постера" value={posterUrl} onChange={e => setPosterUrl(e.target.value)} />
        <input type="text" placeholder="Цитата из фильма" value={quote} onChange={e => setQuote(e.target.value)} />
        <input type="text" placeholder="Актёры / голоса" value={cast} onChange={e => setCast(e.target.value)} />
        <div className="form-buttons">
          <button type="submit">Сохранить</button>
          <button type="button" onClick={onClose}>Отмена</button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;