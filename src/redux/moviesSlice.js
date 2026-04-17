import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    { 
      id: 1, 
      title: "Игра в кальмара", 
      poster: "https://i.pinimg.com/736x/fd/44/3e/fd443ee69d08594304af11f39185f188.jpg",
      description: "триллер / драма", 
      likes: 0, 
      isFavorite: false, 
      ratings: [], 
      averageRating: 0 
    },
    { 
      id: 2, 
      title: "Очень странные дела", 
      poster: "https://i.pinimg.com/736x/a9/30/07/a93007244285e85afaa23d20c86fc565.jpg",
      description: "ужасы / фантастика / фэнтези", 
      likes: 0, 
      isFavorite: false, 
      ratings: [], 
      averageRating: 0 
    },
    { 
      id: 3, 
      title: "Ведьмак", 
      poster: "https://i.pinimg.com/736x/9a/ab/e8/9aabe8e47cc2c3ba25aacce0eec67141.jpg",
      description: "ужасы / фэнтези / боевик", 
      likes: 0, 
      isFavorite: false, 
      ratings: [], 
      averageRating: 0 
    },
    { 
      id: 4, 
      title: "Бриджертоны", 
      poster: "https://i.pinimg.com/736x/04/49/26/044926f859d143d403423ec88ad940cf.jpg",
      description: "драма / мелодрама", 
      likes: 0, 
      isFavorite: false, 
      ratings: [], 
      averageRating: 0 
    },
  ],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Получение списка (заглушка для fetchMovies)
    fetchMovies: (state) => {
    },
    // Добавление лайка
    toggleLike: (state, action) => {
      const movie = state.list.find(m => m.id === action.payload);
      if (movie) movie.likes += 1;
    },
    // Избранное
    toggleFavorite: (state, action) => {
      const movie = state.list.find(m => m.id === action.payload);
      if (movie) movie.isFavorite = !movie.isFavorite;
    },
    // Рейтинг
    addRating: (state, action) => {
      const { movieId, rating } = action.payload;
      const movie = state.list.find(m => m.id === movieId);
      if (movie) {
        if (!movie.ratings) movie.ratings = [];
        movie.ratings.push(rating);
        const sum = movie.ratings.reduce((a, b) => a + b, 0);
        movie.averageRating = Number((sum / movie.ratings.length).toFixed(1));
      }
    },
    // Добавление фильма (для MovieForm)
    addMovie: (state, action) => {
      const newId = state.list.length > 0 ? Math.max(...state.list.map(m => m.id)) + 1 : 1;
      state.list.push({ ...action.payload, id: newId, likes: 0, isFavorite: false, ratings: [], averageRating: 0 });
    },
    // Обновление фильма (для MovieForm)
    updateMovie: (state, action) => {
      const index = state.list.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload.updatedMovie };
      }
    },
    // Удаление фильма
    deleteMovie: (state, action) => {
      state.list = state.list.filter(m => m.id !== action.payload);
    }
  }
});

// Экспортируем ВСЕ функции, которые ищут твои компоненты
export const { 
  fetchMovies, 
  toggleLike, 
  toggleFavorite, 
  addRating, 
  addMovie, 
  updateMovie, 
  deleteMovie 
} = moviesSlice.actions;

export default moviesSlice.reducer;