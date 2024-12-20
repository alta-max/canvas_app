import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from './canvasSlicer';

const store = configureStore({
  reducer: {
    canvas: canvasReducer, 
  },
});

export default store;
