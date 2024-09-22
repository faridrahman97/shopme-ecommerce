import React from "react";
import ProductCard from "./ProductCard";
import useProductStore from "../stores/useProductStore";
import useCartStore from "../stores/useCartStore";

const PeopleAlsoBought = () => {
  const { getRecommendedProducts, products } = useProductStore();
  const { cart } = useCartStore();
  React.useEffect(() => {
    getRecommendedProducts();
  }, [getRecommendedProducts]);

  const productCards = products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ));
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-blue-400">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {productCards}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
