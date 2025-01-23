// its all about fetch the data from the server

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
const base_url = "https://bike-shop-server-weld.vercel.app/";
const baseQuery = fetchBaseQuery({
  baseUrl: base_url,
});
const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});

export default apiSlice;
