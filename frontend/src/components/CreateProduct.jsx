import React from "react";
import { motion } from "framer-motion";
import { Upload, Loader } from "lucide-react";
import useProductStore from "../stores/useProductStore";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const CreateProduct = () => {
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(product);
      setProduct({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });
    } catch (error) {
      console.log("Error in handleSubmit controller", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result });
      };

      reader.readAsDataURL(file); // base64 format
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-slate-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
    >
      <h2 className="text-2xl text-blue-500 font-semibold mb-6 text-center">
        Create New Product
      </h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-slate-900 flex flex-col gap-5 py-8 px-10 rounded-lg mx-auto max-w-[500px]"
      >
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="name" className="cursor-pointer">
            Product name:{" "}
          </label>
          <input
            type="text"
            id="name"
            required
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Khaki Shoes"
            className="px-3 py-2 bg-slate-700 border border-slate-600
      rounded-md shadow-sm placeholder-slate-400 focus:outline-none
      focus:ring-blue-500 sm:text-lg"
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="price" className="cursor-pointer">
            Product price:{" "}
          </label>
          <input
            type="number"
            min="0"
            id="price"
            step="0.5"
            required
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            placeholder="350"
            className="px-3 py-2 bg-slate-700 border border-slate-600
      rounded-md shadow-sm placeholder-slate-400 focus:outline-none
      focus:ring-blue-500 sm:text-lg"
          />
        </div>

        <div className="flex flex-col gap-1 relative">
          <label htmlFor="description" className="cursor-pointer">
            Product description:{" "}
          </label>
          <textarea
            type="text"
            id="description"
            required
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            placeholder="Write a description here..."
            rows="3"
            className="px-3 py-2 bg-slate-700 border border-slate-600
      rounded-md shadow-sm placeholder-slate-400 focus:outline-none
      focus:ring-blue-500 sm:text-lg resize-none overflow-scroll"
          />
        </div>

        <div className="flex flex-col gap-1 relative">
          <label htmlFor="category" className="cursor-pointer">
            Product category:{" "}
          </label>
          <select
            id="category"
            name="category"
            required
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="px-3 py-2 bg-slate-700 border border-slate-600
      rounded-md shadow-sm placeholder-slate-400 focus:outline-none
      focus:ring-blue-500 sm:text-lg cursor-pointer border-r-8 border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 relative mt-3">
          <input
            id="image"
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
          <label
            htmlFor="image"
            className="px-3 py-2 bg-slate-700 border-none
      rounded-md shadow-sm placeholder-slate-400 focus:outline-none
      focus:ring-blue-500 text-base sm:text-lg cursor-pointer hover:opacity-80 flex items-center justify-center"
          >
            <Upload className="mr-2 h-5 w-5 inline-block" />
            Upload Image
          </label>
          {product.image && (
            <div className="text-base text-center text-blue-300 mt-3">
              Image Uploaded
            </div>
          )}
        </div>
        <button
          disabled={loading}
          type="submit"
          className={`py-2 text-lg w-full sm:text-xl ${
            loading
              ? "px-3 cursor-not-allowed opacity-70"
              : "px-8 hover:opacity-80 active:opacity-100"
          } bg-blue-500 rounded-md duration-200`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              Loading...
            </div>
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProduct;
