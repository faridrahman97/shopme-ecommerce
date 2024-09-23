import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Loader } from "lucide-react";
import { motion } from "framer-motion";
import useUserStore from "../stores/useUserStore";
import useTitle from "../hooks/useTitle";

const LoginPage = () => {
  useTitle("SHOPME - Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const { login, loading } = useUserStore();

  return (
    <section className="p-5 tracking-wider min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-center text-3xl font-extrabold text-blue-500 mb-24">
          Login to your account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 flex flex-col gap-5 py-8 px-10 rounded-lg mx-auto max-w-[500px]"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="cursor-pointer">
              Email:{" "}
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              loading ? "px-3" : "px-8"
            } mx-auto mt-5 bg-blue-500 rounded-md duration-200 hover:opacity-80 active:opacity-100 flex items-center`}
          >
            {loading ? (
              <div className="flex items-center">
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Loading...
              </div>
            ) : (
              "Login"
            )}
          </button>
          <p className="mx-auto pt-4 flex">
            Don't have an account?
            <Link
              to="/login"
              className="text-blue-500 duration-200 hover:text-blue-400"
            >
              <span className="flex items-center">
                <UserPlus className="ml-2 mr-1 h-5 w-5" />
                Register here
              </span>
            </Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default LoginPage;
