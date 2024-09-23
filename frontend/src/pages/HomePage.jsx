import React from "react";
import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import useProductStore from "../stores/useProductStore";
import { useEffect } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import useTitle from "../hooks/useTitle";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.jpg" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  useTitle("SHOPME");
  const { getFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    getFeaturedProducts();
  }, [getFeaturedProducts]);

  return (
    <section className="relative min-h-screen text-white overflow-hidden tracking-wider">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-center text-5xl sm:text-6xl font-bold text-blue-500 mb-4">
            Explore Our Categories
          </h1>
          <p className="text-center text-xl text-slate-400 mb-12 italic">
            Discover your new style today
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
            {categories.map((category) => (
              <CategoryItem category={category} key={category.name} />
            ))}
          </div>
          {!isLoading && products.length > 0 && (
            <FeaturedProducts products={products}></FeaturedProducts>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;
