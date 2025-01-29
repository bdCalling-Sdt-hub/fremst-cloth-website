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
  }),
});

export const { useOrdersByUserQuery } = orderApi;
