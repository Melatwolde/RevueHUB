'use client';
import React, { useState, useEffect } from 'react';
import { useGetSingleProductQuery } from '../../store/ProductSlice';
import logo from '../../../../public/logo.png';
import Link from 'next/link';
import { Alert, Button, TextField, Rating, Typography } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import Loading from '@/app/components/loading';

interface ProductProps {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  tags?: string[];
  use?: string;
  minimumQuantity?: number;
  sellingPrice?: string;
  addedBy?: string;
  expiresAt?: string;
  quantityOnHand?: string;
  reservedQuantity?: string;
  discount?: string;
  imageUrls?: string[];
}

interface ReviewProps {
  reviewerName: string;
  rating: number;
  comment: string;
}

const Product_Detail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleProductQuery(id as string);

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [newReview, setNewReview] = useState<ReviewProps>({
    reviewerName: '',
    rating: 0,
    comment: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    if (data) {
      setProducts([data]);
    }
  }, [data]);

  const handleReviewSubmit = () => {
    if (newReview.reviewerName && newReview.rating > 0 && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ reviewerName: '', rating: 0, comment: '' });
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/reviews?productId=${id}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  if (isLoading) return <Loading />;
  if (error) {
    const errorMessage = 'status' in error ? `Error: ${error.status}` : error.message;
    return <Alert severity="error">{errorMessage}</Alert>;
  }
  if (!data) return <p>No product data found</p>;

  return (
    <div className="bg-[#EBF2F7] h-[1000px]">
      <div className="flex">
        <div className="flex flex-row">
          <img src={logo.src} alt="logo" className='ml-6 w-[224px] h-[154px] ]' />
          <div className='flex flex-row ml-[590px] mt-14 gap-24 text-[20px]'>
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
      <div className='ml-7'>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="flex flex-row gap-4">
              <div className="flex flex-col ml-5 w-[600px]">
                {product.imageUrls && product.imageUrls.length > 0 && (
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="w-[597px] h-[419px]"
                  />
                )}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">Write a Review</h3>
                  <div className="mb-4">
                    <TextField
                      label="Your Name"
                      fullWidth
                      value={newReview.reviewerName}
                      onChange={(e) =>
                        setNewReview({ ...newReview, reviewerName: e.target.value })
                      }
                      className='bg-[#F9FAFB]'
                    />
                  </div>
                  <div className="mb-4">
                    <Rating
                      value={newReview.rating}
                      onChange={(event, newValue) =>
                        setNewReview({ ...newReview, rating: newValue || 0 })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <TextField
                      label="Your Comment"
                      multiline
                      rows={4}
                      fullWidth
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                      }
                      className='bg-[#F9FAFB]'
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReviewSubmit}
                    disabled={
                      !newReview.reviewerName || !newReview.rating || !newReview.comment
                    }
                  >
                    Submit Review
                  </Button>
                </div>
              </div>
              <div className='bg-[#5A5A5A] h-[721px] w-[0.8px] ml-6'></div>
              <div className='flex flex-col ml-5'>
                <div>
                  <div className="text-[40px] font-bold">{product.name}</div>
                  <div className="flex flex-row gap-5">
                    <Typography variant="h6" className="text-green-600 mb-1">
                      ${product.sellingPrice} <span className="line-through text-gray-500 ml-3">${product.price}</span>
                    </Typography>
                    <Typography className="mb-5 text-[#D22B2B]">
                      {product.discount}% off
                    </Typography>
                  </div>
                  <div className="text-[16px] text-[#767474] flex flex-row items-center gap-2">
                    category{' '} <div className="bg-[#D9D9D9] w-[8px] h-[8px] rounded-full mt-1"></div> {product.category}
                  </div>
                  <div className="text-[#333333] w-[594px] h-auto text-[18px] mt-3">
                    {product.description}
                  </div>
                  <div className="flex flex-row gap-[90px]">
                    <div className='flex flex-row gap-3'><div className='font-semibold text-[24px]'>Quantity on hand - </div><div className='text-[#3C3C3C] text-[18px] mt-[6.5px]'>{product.quantityOnHand}</div></div>
                    <div className='flex flex-row gap-3'><div className='font-semibold text-[24px]'>Reserved - </div><div className='text-[#3C3C3C] text-[18px] mt-[6.5px]'>{product.reservedQuantity}</div></div>
                  </div>
                  <div className='flex flex-row gap-3'><div className='font-semibold text-[24px] mt-2'>Expires at </div><div className='text-[#3C3C3C] text-[18px] mt-[14px]'>{product.expiresAt}</div></div>
                </div>
                {product?.tags && product.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap mt-2 space-x-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-[#F2FEF4] shadow-custom text-gray-800 text-sm rounded-[5px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <h2 className="text-2xl font-bold mb-4 mt-4 cursor-pointer" onClick={fetchReviews}>Customer Reviews</h2>
                <div className='w-[685px] h-[140px]'>
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <div key={index} className="mb-4 p-4 border rounded-md bg-gray-50 shadow-sm">
                        <p className="font-semibold text-gray-800">{review.reviewerName}</p>
                        <Rating value={review.rating} readOnly className="mb-2" />
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
    </div>
  );
};

export default Product_Detail;
