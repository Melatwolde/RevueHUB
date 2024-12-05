import { useState } from "react";
import ProductUpdateForm from "./UpdateProduct";

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  use: string;
  minimumQuantity: number;
  sellingPrice: number;
  addedBy: string;
  expiresAt: Date;
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="border p-4">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded">
        Edit Product
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full">
            <button onClick={closeModal} className="absolute top-2 right-2">
              X
            </button>
            <ProductUpdateForm product={product} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
