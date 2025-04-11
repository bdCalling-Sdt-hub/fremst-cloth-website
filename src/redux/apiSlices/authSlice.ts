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

    forgerPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
        headers: {
          Authorization: localStorage.getItem("oneTimeToken") || undefined,
        },
      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
      providesTags: ["userProfile"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["userProfile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useForgerPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
