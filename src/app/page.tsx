'use client';

import React from 'react';
import { useGetAllProductsQuery } from '../app/store/ProductSlice';
import Mainpage from './components/mainpage';
import HomePage from './Homepage/page';
import Loading from './components/loading';
export default function Home() {
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <Loading/>;
  if (error) return <div>Error loading products.</div>;
  if (!products || products.length === 0) return <div>No products available.</div>;

  // const handleCardClick = (id: number) => {
  //   console.log(`Product ${id} clicked`);
  // };

  return (
    <main>
     
      {/* <ProductList /> */}
      {/* <ProductDetail/> */}
      {/* <CreateProduct /> */}
      <HomePage/>
    </main>
  );
}
