// // src/store/index.ts
// import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "../services/authApi"; // API service for auth
// import authReducer from "../slices/authSlice"; // Auth slice to manage state
// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [authApi.reducerPath]: authApi.reducer, // Integrate RTK Query API service
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware), // Add RTK Query middleware
// });

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
