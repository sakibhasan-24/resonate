// its all about fetch the data from the server

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
const base_url = "https://bike-shop-server-weld.vercel.app/api/";
// const baseQuery = fetchBaseQuery({
//   baseUrl: base_url,
// });
// const apiSlice = createApi({
//   baseQuery,

//   endpoints: (builder) => ({}),
// });

// export default apiSlice;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // Name of the reducer
  baseQuery: fetchBaseQuery({ baseUrl: base_url }), // Base URL for all API requests
  endpoints: () => ({}), // We will inject endpoints here later
});

export default apiSlice;
