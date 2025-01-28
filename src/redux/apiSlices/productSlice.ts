import api from "../api/baseApi";

const productServiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/product/all",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const { useGetProductsQuery } = productServiceApi;
