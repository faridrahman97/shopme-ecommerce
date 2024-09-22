import React from "react";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import useCartStore from "../stores/useCartStore";

const Navbar = ({ isMobile, mobileMenuOpen, handleMobileMenuOpen }) => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const navigate = useNavigate();

  const handleMobileLogout = () => {
    logout();
    handleMobileMenuOpen();
    navigate("/login");
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-200 border-b border-blue-800 p-5 md:px-8 lg:px-10 flex">
      <nav
        className={`items-center ${
          isMobile && mobileMenuOpen
            ? "flex-col mx-auto text-center"
            : "flex justify-between w-full"
        }`}
      >
        <div
          className={`relative ${
            isMobile && mobileMenuOpen ? "mb-4 w-full" : ""
          }`}
        >
          <Link
            to="/"
            className="text-3xl font-bold text-blue-500"
            onClick={isMobile && mobileMenuOpen ? handleMobileMenuOpen : null}
          >
            SHOPME
          </Link>
          {isMobile ? (
            !mobileMenuOpen ? (
              <Menu
                className="fixed right-5 top-[1.375rem] cursor-pointer"
                size={30}
                onClick={handleMobileMenuOpen}
              ></Menu>
            ) : (
              <X
                className="fixed right-5 top-[1.375rem] cursor-pointer"
                size={30}
                onClick={handleMobileMenuOpen}
              ></X>
            )
          ) : null}
        </div>
        <div
          className={`flex items-center gap-4 ${
            isMobile && mobileMenuOpen
              ? "flex-col text-center min-h-screen gap-6"
              : "flex"
          }`}
        >
          <Link
            to="/"
            className={`hover:text-blue-400 active:text-white duration-200 text-md ${
              isMobile ? (mobileMenuOpen ? "block" : "hidden") : ""
            }`}
            onClick={isMobile ? handleMobileMenuOpen : null}
          >
            Home
          </Link>
          {user && (
            <Link
              to="/cart"
              className={`relative group flex items-center ${
                isMobile ? (mobileMenuOpen ? "block" : "hidden") : ""
              }`}
              onClick={isMobile ? handleMobileMenuOpen : null}
            >
              {cart.length > 0 && (
                <span className="absolute -top-3 -right-2 bg-blue-600 text-white rounded-full px-[0.3rem] py-[0.1rem] text-xs group-active:bg-blue-500 transition duration-200 ease-in-out">
                  {cart.length}
                </span>
              )}
              <ShoppingCart
                className="mr-1 group-hover:text-blue-400 group-active:text-white duration-200"
                size={20}
              />
              <span className="group-hover:text-blue-400 group-active:text-white duration-200">
                Cart
              </span>
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/dashboard"
              className={`bg-blue-600 hover:opacity-80 active:opacity-100 text-white px-3 py-1 rounded-md font-medium transition duration-200 ease-in-out flex items-center ${
                isMobile ? (mobileMenuOpen ? "block" : "hidden") : ""
              }`}
              onClick={isMobile ? handleMobileMenuOpen : null}
            >
              <Lock className="inline-block mr-1" size={18} />
              <span>Dashboard</span>
            </Link>
          )}

          {user ? (
            <button
              className={`bg-slate-800 hover:bg-slate-700 text-white py-[0.3rem] font-medium px-3 rounded-md flex items-center gap-1 transition duration-200 ease-in-out ${
                isMobile ? (mobileMenuOpen ? "block" : "hidden") : ""
              }`}
              onClick={isMobile ? handleMobileLogout : () => logout()}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={`bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-white py-[0.3rem] font-medium px-3 rounded-md flex items-center gap-1 transition duration-200 ease-in-out ${
                  isMobile ? (mobileMenuOpen ? "block" : "hidden") : ""
                }`}
                onClick={isMobile ? handleMobileMenuOpen : null}
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className={`bg-blue-600 hover:opacity-80 active:opacity-100 text-white py-[0.3rem] font-medium px-3 rounded-md flex items-center gap-1 transition duration-200 ease-in-out               ${
                  isMobile ? (mobileMenuOpen ? "block" : "hidden") : ""
                }`}
                onClick={isMobile ? handleMobileMenuOpen : null}
              >
                <UserPlus size={18} />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
