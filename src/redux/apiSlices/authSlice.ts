import api from "../api/baseApi";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserProfileQuery } = authApi;
