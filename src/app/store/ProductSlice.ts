import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ProductProps {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  tags: string[];
  use?: string;
  minimumQuantity: number;
  sellingPrice?: string;
  addedBy: string;
  expiresAt: string;
  quantityOnHand: string;
  reservedQuantity: string;
  discount: string;
  imageUrls?: string[];
}

interface ProductsResponse {
  length: number;
  data: ProductProps[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://test-api.nova-techs.com/' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => 'products',
    }),
    getSingleProduct: builder.query<ProductProps, string>({
      query: (id) => `products/${id}`,
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductQuery,useDeleteProductMutation } = productApi;