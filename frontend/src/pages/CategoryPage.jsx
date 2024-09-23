import React from "react";
import useProductStore from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import useTitle from "../hooks/useTitle";

const CategoryPage = () => {
  useTitle(`SHOPME - ${category.charAt(0).toUpperCase() + category.slice(1)}`);
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  React.useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  console.log(products);
  return (
    <section className="min-h-screen pt-20 flex flex-col items-center">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-4xl sm:text-5xl font-bold text-blue-500 mb-8"
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
      >
        {products?.length === 0 && (
          <h2 className="text-3xl font-semibold text-slate-400 text-center col-span-full">
            No products found in this category
          </h2>
        )}

        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </motion.div>
    </section>
  );
};

export default CategoryPage;
