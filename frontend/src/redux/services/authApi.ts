// src/services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    loginWithGoogle: builder.mutation({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials, // pass login data
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    saveUserData: builder.mutation({
      query: (userData) => ({
        url: "users/save",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginWithGoogleMutation,
  useLogoutMutation,
  useSaveUserDataMutation,
} = authApi;
