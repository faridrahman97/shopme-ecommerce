import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import useCartStore from "../stores/useCartStore";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51PxgCRP52ElTZKQTxnsYOlHq9FNrnVIczKtgujW04d0zFFBHOYdZOjIEPnaQG6A1PEeL36FBO2KBwOGdENKMBoV600ztBWIUof"
);
const OrderSummary = () => {
  const { subTotal, total, coupon, isCouponApplied, cart } = useCartStore();
  const savings = subTotal - total;
  const formattedSubtotal = subTotal.toFixed(2);
  const formattedTotal = total.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axiosInstance.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      toast.error(result.error.message);
    }
  };

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-slate-700 bg-slate-800 p-4 shadow-sm sm:p-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-blue-400">Order summary</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">
              Original price
            </dt>
            <dd className="text-base font-medium text-white">
              ${formattedSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Savings</dt>
              <dd className="text-base font-medium text-blue-400">
                -${savings}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">
                Coupon {coupon.code}
              </dt>
              <dd className="text-base font-medium text-blue-400">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
            <dt className="text-base font-bold text-white">Total</dt>
            <dd className="text-base font-bold text-blue-400">
              ${formattedTotal}
            </dd>
          </dl>
        </div>

        <button
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 duration-200"
          onClick={handlePayment}
        >
          Proceed to Checkout
        </button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:opacity-70 hover:underline duration-200"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
