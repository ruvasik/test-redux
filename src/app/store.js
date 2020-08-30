import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/counter/searchSlice';

export default configureStore({
  reducer: {
    search: searchReducer,
  },
});
