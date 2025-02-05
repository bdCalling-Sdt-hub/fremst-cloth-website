import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.80.49:5010/api/v1",
    // baseUrl: "http://164.90.205.5:5001/api/v1",
    // baseUrl: 'https://tamim.binarybards.online/api/v1',
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["category", "product", "order", "userProfile", "cart"],
});

export const { reducer } = api;
export default api;
