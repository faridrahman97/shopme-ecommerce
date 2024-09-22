import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useCartStore from "../stores/useCartStore";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = React.useState("");
  const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } =
    useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) {
      setUserInputCode(coupon.code);
    }
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (!userInputCode) {
      return;
    }
    applyCoupon(userInputCode);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
  };

  return (
    <motion.div
      className="space-y-4 p-4 rounded-lg border border-slate-700 bg-slate-800 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <label
            htmlFor="voucher"
            className="block text-sm font-medium text-slate-300"
          >
            Do you have a voucher or gift card?
          </label>
          <input
            type="text"
            id="voucher"
            className="block w-full rounded-lg border border-slate-600 bg-slate-700 
            p-2.5 text-sm text-white placeholder-slate-400 focus:border-blue-500 
            focus:ring-blue-500"
            placeholder="Enter code here"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            required
          />

          <button
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 duration-200"
            onClick={handleApplyCoupon}
          >
            Apply Code
          </button>
        </div>
      </div>
      {isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-slate-300">Applied coupon</h3>
          <p className="mt-2 text-sm text-slate-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
          <button
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 
            px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none
             focus:ring-4 focus:ring-red-300 duration-200"
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </button>
        </div>
      )}
      {coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-slate-300">
            Your Available Coupon:
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default GiftCouponCard;
