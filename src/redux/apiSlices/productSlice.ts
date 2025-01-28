import api from "../api/baseApi";

const productServiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: "/product?sortBy=totalSales&sortOrder=desc",
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    getWinterCollection: builder.query({
      query: () => ({
        url: "/product?searchTerm=winter",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAllProductsQuery,
  useGetTopProductsQuery,
  useGetWinterCollectionQuery,
} = productServiceApi;
