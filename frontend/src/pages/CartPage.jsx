import React from "react";
import useCartStore from "../stores/useCartStore";
import { motion } from "framer-motion";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";
import EmptyCartUI from "../components/EmptyCartUI";
import useTitle from "../hooks/useTitle";

const CartPage = () => {
  useTitle("SHOPME - Cart");
  const { cart, clearCart } = useCartStore();
  return (
    <section className="pt-24 min-h-screen lg:py-24">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {cart.length > 0 && (
          <div className="flex w-full justify-between">
            <h2 className="max-w-screen-xl text-3xl font-extrabold text-blue-500">
              Checkout summary
            </h2>
            <p
              className="flex items-center justify-center bg-none px-5 py-2.5 text-base font-medium text-white hover:text-red-400 focus:outline-none focus:ring-4 focus:ring-blue-300 duration-200 cursor-pointer"
              onClick={() => clearCart()}
            >
              Clear Cart
            </p>
          </div>
        )}
        <div
          className={`${
            cart.length > 0
              ? "grid grid-cols-1 lg:grid-cols-3 gap-3 mt-6"
              : "flex items-center justify-center"
          }`}
        >
          <motion.div
            className="mx-auto w-full lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
            {cart.length > 0 && <PeopleAlsoBought />}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className="flex-1 space-y-6 mt-0 w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary />
              <GiftCouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartPage;
