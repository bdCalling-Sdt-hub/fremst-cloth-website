import api from "../api/baseApi";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    ordersByUser: builder.query({
      query: (id) => ({
        url: `/order/user-order?employeeId=${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order", "userProfile"],
    }),
  }),
});

export const { useOrdersByUserQuery, useCreateOrderMutation } = orderApi;
