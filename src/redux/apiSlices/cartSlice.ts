import api from "../api/baseApi";

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
    getCartItems: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
  }),
});

export const { useCreateCartMutation, useGetCartItemsQuery } = cartApi;
