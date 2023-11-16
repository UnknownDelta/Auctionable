import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer'; // Update the path as needed

const store = configureStore({
  reducer: userReducer,
  // Other options like middleware, devTools, etc. can be added here
});

export default store;
