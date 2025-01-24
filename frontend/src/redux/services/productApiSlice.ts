// import apiSlice from "./apiSlice";
interface Product<T = {}> {
  additionalInfo?: T;
}

import apiSlice from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => "/products", // Your API endpoint
    }),
  }),
});

export const { useGetAllProductsQuery } = productApiSlice;
