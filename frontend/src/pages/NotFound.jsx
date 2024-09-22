import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
  useTitle("Not Found");
  return (
    <section className="p-5 tracking-wider min-h-screen flex flex-col justify-center">
      <h2 className="text-center text-3xl font-extrabold text-slate-400">
        Whoops! Page Not Found :/
      </h2>
      <Link
        to="/"
        className="text-center text-3xl font-extrabold text-blue-400 hover:opacity-80 duration-200"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
