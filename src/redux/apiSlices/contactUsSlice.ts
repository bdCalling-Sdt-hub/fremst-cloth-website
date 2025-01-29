import api from "../api/baseApi";

const contactUsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    contactUs: builder.mutation({
      query: (data) => ({
        url: "/auth/contact",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useContactUsMutation } = contactUsApi;
