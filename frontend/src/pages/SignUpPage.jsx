import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import useUserStore from "../stores/useUserStore";
import useTitle from "../hooks/useTitle";

const SignUpPage = () => {
  useTitle("SHOPME - Sign Up");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <section className="p-5 tracking-wider min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-center text-3xl font-extrabold text-blue-500 my-6 pt-10">
          Create your account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 flex flex-col gap-5 py-8 px-10 rounded-lg mx-auto max-w-[500px]"
        >
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="name" className="cursor-pointer">
              Full name:{" "}
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
              className="px-3 py-2 bg-slate-700 border border-slate-600 
              rounded-md shadow-sm placeholder-slate-400 focus:outline-none 
              focus:ring-blue-500 sm:text-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="cursor-pointer">
              Email:{" "}
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="johndoe@example.com"
              className="px-3 py-2 bg-slate-700 border border-slate-600 
              rounded-md shadow-sm placeholder-slate-400 focus:outline-none 
              focus:ring-blue-500 sm:text-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="cursor-pointer">
              Password:{" "}
            </label>
            <input
              type="password"
              id="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="********"
              className="px-3 py-2 bg-slate-700 border border-slate-600 
              rounded-md shadow-sm placeholder-slate-400 focus:outline-none 
              focus:ring-blue-500 sm:text-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="cursor-pointer">
              Confirm Password:{" "}
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="********"
              className="px-3 py-2 bg-slate-700 border border-slate-600 
              rounded-md shadow-sm placeholder-slate-400 focus:outline-none 
              focus:ring-blue-500 sm:text-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`py-2 ${
              loading
                ? "px-3 cursor-not-allowed opacity-70"
                : "px-8 hover:opacity-80 active:opacity-100"
            } mx-auto mt-5 bg-blue-500 rounded-md duration-200 flex items-center`}
          >
            {loading ? (
              <div className="flex items-center">
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="mx-auto pt-4 flex">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-500 duration-200 hover:text-blue-400"
            >
              <span className="flex items-center">
                <ArrowRight className="ml-2 mr-1 h-5 w-5" />
                Login here
              </span>
            </Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default SignUpPage;
