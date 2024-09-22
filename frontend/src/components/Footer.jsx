import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-200 border-b border-blue-800 p-5 md:px-8 lg:px-10 flex justify-center mt-5">
      <div className="">
        <p className="text-md font-bold text-slate-400 items-center space-x-2 flex">
          Copyright &#169; {new Date().getFullYear()} SHOPME
        </p>
      </div>
    </footer>
  );
};

export default Footer;
