import { configureStore } from "@reduxjs/toolkit";
import busReducer from './slice/busSlice';
export const store = configureStore({
  reducer: {
    bus: busReducer,
  }
});