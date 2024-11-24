import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  canvases: [],
  activeView: 'create',
  selectedCanvasData: null,
  isDropdownOpen: false,
  activeCanvasId: null,
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvases: (state, action) => {
      state.canvases = action.payload;
    },
    setActiveView: (state, action) => {
      state.activeView = action.payload;
      if (action.payload !== 'view') {
        state.isDropdownOpen = false;
      }
    },
    setSelectedCanvasData: (state, action) => {
      state.selectedCanvasData = action.payload;
    },
    setDropdownOpen: (state, action) => {
      state.isDropdownOpen = action.payload;
    },
    setActiveCanvasId: (state, action) => {
      state.activeCanvasId = action.payload;
    },
  },
});

export const {
  setCanvases,
  setActiveView,
  setSelectedCanvasData,
  setDropdownOpen,
  setActiveCanvasId,
} = canvasSlice.actions;

export default canvasSlice.reducer;
