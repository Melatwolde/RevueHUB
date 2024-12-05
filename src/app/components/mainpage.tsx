'use client';

import React, { useState, useEffect } from 'react';
import { useGetAllProductsQuery,useDeleteProductMutation} from '../store/ProductSlice';
import { Alert, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button,Typography} from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import CreateProductForm from './popUps/CreateProduct';
import { DeleteOutlineRounded, Edit } from '@mui/icons-material';
import ProductUpdateForm from '../components/popUps/UpdateProduct'

const Mainpage: React.FC = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
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

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [sortType, setSortType] = useState('');
  const [productUse, setProductUse] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();
  const [warningVisible, setWarningVisible] = useState<string | null>(null);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
    }
  }, [data]);

  const handleSort = (sortType: string) => {
    const sortedProducts = [...products];

    switch (sortType) {
      case 'price-asc':
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
    setSortType(sortType);
  };

  const handleProductUseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductUse((event.target as HTMLInputElement).value);
  };

  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id).unwrap(); 
      setProducts(products.filter((product) => product.id !== id)); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const showWarning = (id: string) => {
    setWarningVisible(id);
  };
  const confirmDelete = (id: string) => {
    handleDeleteProduct(id);
    setWarningVisible(null);
  };

  if (isLoading) return <div className='center'>Loading...</div>;
  if (error) return <Alert severity="error">Error fetching products: {JSON.stringify(error)}</Alert>;

  return (
    <div className='flex flex-row bg-[#EBF2F7] h-[1800px]'>
      <div className='flex flex-col gap-3 ml-3'>
        <div className="p-4 ">
          {/* Sort By */}
          <div className="mb-6 bg-[#F2FEF4] w-[386px]">
            <select
              className="w-full p-2 border rounded bg-[#F2FEF4]"
              value={sortType}
              onChange={(e) => handleSort(e.target.value)}>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">A to Z</option>
              <option value="name-desc">Z to A</option>
            </select>
          </div>

          {/* Categories */}
          <div className="mb-6 bg-white h-[150px] w-[386px]">
            <h2 className="text-[24px] text-[#3C3C3C] mb-4  bg-[#F2FEF4] p-3">Categories</h2>
            <ul className="list-none ml-7 ">
              <li className="text-[#3C3C3C] cursor-pointer -mt-4 font-bold">Electronics</li>
              <li className="text-[#5A5A5A] cursor-pointer ml-4">Mobile Phones</li>
              <li className="text-[#5A5A5A] cursor-pointer ml-4">Smart Phones</li>
            </ul>
          </div>

          {/* Product Use */}
          <div className="mb-6 bg-white h-[118px] w-[386px]">
            <h2 className="text-[24px] text-[#3C3C3C] mb-4 bg-[#F2FEF4] p-3">Product Use</h2>
            <div className='flex flex-row ml-4 -mt-2-'>
              <RadioGroup row aria-label="product-use" name="product-use" value={productUse} onChange={handleProductUseChange} className="text-[16px] text-[#3C3C3C]">
                <FormControlLabel value="sell" control={<Radio />} label="For Sell" />
                <FormControlLabel value="rent" control={<Radio />} label="For Rent" />
                <FormControlLabel value="use" control={<Radio />} label="For Use" />
              </RadioGroup>
            </div>
          </div>
          {/* creat a product hre */}
          <div >
            <div onClick={toggleFormVisibility} className="cursor-pointer text-[24px] text-[#3C3C3C] mb-4 bg-[#F2FEF4] p-3">Add Your Product</div>
              {isFormVisible && (
                <div className="modal">
                  <CreateProductForm />
                </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
            <div className='flex flex-wrap w-[1040px] h-[930px] bg-[#FFFFFF] mt-4 '>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id}>
                  <div className='group flex flex-col w-[346.66px] h-[310px] gap-[21px] border border-[#ececec] pt-[11px] pl-[23px] border-t-0 border-l-0 cursor-pointer'>
                    <div className='text-[20px] text-[#626262] font-bold'>{product.name}</div>
                    <div className='text-[16px] text-[#626262] -mt-5'>tags . {product.category}</div>
                    {product.imageUrls && product.imageUrls.length > 0 && (
                      <img src={product.imageUrls[0]} alt={product.name} className='w-[227px] h-[102px]' />
                    )}
                    <div className='text-[16px] text-[#3C3C3C] mt-10'>{truncateText(product.description, 40)}</div>
                    <div className='flex flex-row -mt-6'>
                      <div className='text-[24px] font-bold text-[#626262] w-[238px]'>{product.addedBy}</div>
                      <div className='text-[24px] font-bold text-[#626262]'>${product.price}</div>
                    </div>
                    <div
                  className={`flex flex-col opacity-0 group-hover:opacity-100 -mt-80 ml-[270px] w-12 h-[60px] pt-2 rounded-[5px] items-center bg-gray-200 ${warningVisible === product.id ? 'pointer-events-none' : ''}`}
                >
                  <DeleteOutlineRounded
                    className="hover:text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // may be this might be the reason 
                      handleDeleteProduct(product.id);
                    }}
                  />
                  <Edit
                    className="hover:text-blue-600 cursor-pointer"
                    onClick={(e) => e.stopPropagation()} // its routing here when the icons are clicked so fix it 
                  />
                </div>

                {warningVisible === product.id && (
                  <div className="absolute bg-white border border-red-500 p-4 rounded shadow-lg">
                    <p className="text-red-500">Are you sure you want to delete this product?</p>
                    <div className="flex justify-end mt-2">
                      <Button onClick={() => confirmDelete(product.id)} color="secondary">Yes</Button>
                      <Button onClick={() => setWarningVisible(null)}>No</Button>
                    </div>
                  </div>
                )}

                  </div>
                </Link>
              ))
            ) : (
              <div>No products found.</div>
            )}
              
            </div>
        <div className='flex flex-row gap-3 w-[194px] h-[44px] bg-white rounded-[14px] mt-9 center ml-[800px]'>
            <Button onClick={handlePreviousPage} disabled={currentPage === 1} className='w-[40px] h-[44px] bg-white rounded-[15px] shadow-custom'>
                <NavigateBeforeIcon/>
            </Button>
            <Typography variant="body1" className='pt-3'> {currentPage} of {totalPages}</Typography>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages} className='w-[40px] h-[44px] bg-white rounded-[15px] shadow-custom'>
                <NavigateNextIcon />
            </Button>
        </div>
        </div>
     
    </div>
  );
};

export default Mainpage;

