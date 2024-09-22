import React from "react";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import axiosInstance from "../lib/axios";
import Confetti from "react-confetti";
import useTitle from "../hooks/useTitle";

const PurchaseSuccess = () => {
  useTitle("Payment Success");
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axiosInstance.post("/payments/checkout-success", { sessionId });
        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
      navigate("/");
    }
  }, [clearCart]);

  if (isProcessing) return "Processing...";

  if (error) return `Error: ${error}`;
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />
      <div className="max-2-md w-full max-w-[500px] bg-slate-800 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <CheckCircle className="text-blue-400 w-16 h-16 mx-auto" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-400 mb-2">
          Purchase Successful!
        </h1>
        <p className="text-slate-300 text-center mb-2">
          Thank you for your order. {"We're"} processing it now.
        </p>
        <p className="text-blue-400 text-center text-sm mb-6">
          Check your email for order details and updates.
        </p>
        <div className="bg-slate-700 rounded-lg p-4 m-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Order number</span>
            <span className="text-sm font-semibold text-blue-400">#12345</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Estimated delivery</span>
            <span className="text-sm font-semibold text-blue-400">
              3-5 business days
            </span>
          </div>
          <div className="space-y-4">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 duration-200 text-white font-bold py-2 px-4
             rounded-lg transition flex items-center justify-center mt-6"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to={"/"}
              className="w-full bg-slate-700 hover:bg-slate-600 text-blue-400 font-bold px-4 
            rounded-lg transition duration-200 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchaseSuccess;
