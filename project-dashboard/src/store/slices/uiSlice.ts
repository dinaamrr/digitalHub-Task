import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  activeView: 'dashboard' | 'projects' | 'tasks' | 'analytics';
  globalSearchQuery: string;
}

const initialState: UiState = {
  sidebarOpen: true,
  activeView: 'dashboard',
  globalSearchQuery: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setActiveView: (state, action: PayloadAction<'dashboard' | 'projects' | 'tasks' | 'analytics'>) => {
      state.activeView = action.payload;
    },
    setGlobalSearchQuery: (state, action: PayloadAction<string>) => {
      state.globalSearchQuery = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setActiveView, setGlobalSearchQuery } = uiSlice.actions;

export default uiSlice.reducer;
