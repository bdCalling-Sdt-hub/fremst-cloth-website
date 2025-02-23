import api from "../api/baseApi";

const productServiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //categories
    getCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    //get products
    getAllProducts: builder.query({
      query: ({
        category,
        minPrice,
        maxPrice,
      }: {
        category: string[];
        minPrice?: number;
        maxPrice?: number;
      }) => {
        const params = new URLSearchParams();

        category.forEach((id) => params.append("category", id));

        if (minPrice !== undefined)
          params.append("minPrice", minPrice.toString());
        if (maxPrice !== undefined)
          params.append("maxPrice", maxPrice.toString());

        return {
          url: `/product?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    getProductByCategory: builder.query({
      query: (id: string) => ({
        url: `/product?category=${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    //home page products
    getTopProducts: builder.query({
      query: () => ({
        url: "/product?sortBy=totalSales&sortOrder=desc",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getWinterCollection: builder.query({
      query: () => ({
        url: "/product",
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
  useGetSingleProductQuery,
  useGetProductByCategoryQuery,
} = productServiceApi;
