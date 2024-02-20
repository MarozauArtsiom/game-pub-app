import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './features/gameSlice.js';
import scoreReducer from './features/scoreSlice.js';

export const store = configureStore({
  reducer: {
    games: gameReducer,
    scores: scoreReducer,
  },
});
