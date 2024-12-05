import { useState } from "react";

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    tags: [],
    use: "",
    minimumQuantity: "",
    sellingPrice: "",
    addedBy: "",
    expiresAt: "",
    quantityOnHand: "",
    reservedQuantity: "",
    discount: "",
    imageUrls: [""],
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTagsChange = (e : { target: { name: any; value: any; }; }) => {
    const tagsArray = e.target.value.split(",");
    setProductData((prevData) => ({
      ...prevData,
      tags: tagsArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      alert("Product created successfully");
    } else {
      alert("Failed to create product");
    }
  };

  return (
    <div className="w-full p-2 bg-white -mt-5">
        <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto">
        <div className=""><h2 className="text-2xl font-semibold mb-4">Create New Product</h2></div>

        <div className="mb-4">
            <label htmlFor="name" className="block">Product Name</label>
            <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="description" className="block">Description</label>
            <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="price" className="block">Price</label>
            <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="category" className="block">Category</label>
            <input
            type="text"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="tags" className="block">Tags (comma separated)</label>
            <input
            type="text"
            id="tags"
            name="tags"
            value={productData.tags.join(",")}
            onChange={handleTagsChange}
            className="w-full p-2 border border-gray-300 rounded"
            />
        </div>

        <div className="mb-4">
            <label htmlFor="use" className="block">Usage</label>
            <input
            type="text"
            id="use"
            name="use"
            value={productData.use}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="minimumQuantity" className="block">Minimum Quantity</label>
            <input
            type="number"
            id="minimumQuantity"
            name="minimumQuantity"
            value={productData.minimumQuantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="sellingPrice" className="block">Selling Price</label>
            <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            value={productData.sellingPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="addedBy" className="block">Added By</label>
            <input
            type="text"
            id="addedBy"
            name="addedBy"
            value={productData.addedBy}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="expiresAt" className="block">Expiration Date</label>
            <input
            type="datetime-local"
            id="expiresAt"
            name="expiresAt"
            value={productData.expiresAt}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="quantityOnHand" className="block">Quantity On Hand</label>
            <input
            type="number"
            id="quantityOnHand"
            name="quantityOnHand"
            value={productData.quantityOnHand}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="reservedQuantity" className="block">Reserved Quantity</label>
            <input
            type="number"
            id="reservedQuantity"
            name="reservedQuantity"
            value={productData.reservedQuantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="discount" className="block">Discount</label>
            <input
            type="number"
            id="discount"
            name="discount"
            value={productData.discount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="imageUrls" className="block">Product Image URL</label>
            <input
            type="url"
            id="imageUrls"
            name="imageUrls"
            value={productData.imageUrls[0]}
            onChange={(e) =>
                setProductData((prevData) => ({
                ...prevData,
                imageUrls: [e.target.value],
                }))
            }
            className="w-full p-2 border border-gray-300 rounded"
            required
            />
        </div>

        <button
            type="submit"
            className="w-full bg-[#F2FEF4] text-black  p-2 rounded"
        >
            Create Product
        </button>
        </form>
    </div>
  );
};

export default CreateProductForm;
