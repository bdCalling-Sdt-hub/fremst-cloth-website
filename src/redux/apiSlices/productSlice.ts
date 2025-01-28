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
  }),
});

export const { useGetCategoriesQuery } = productServiceApi;
