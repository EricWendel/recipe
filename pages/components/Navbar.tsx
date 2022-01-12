import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Login from "./Login";

const Navbar: NextPage = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-4 sticky top-0 z-50">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img className="h-10 w-10" src="/recipeLogoTransparent.png" alt="" />
          <span className="font-semibold text-xl">Recipes</span>
        </div>
        <div className="block md:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={
            "w-full block flex-grow md:flex md:items-center md:w-auto" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <div className="text-sm md:flex-grow">
            <Link href="/" passHref>
              <p className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">
                Home
              </p>
            </Link>
            <Link href="/dashboard" passHref>
              <p className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">
                Dashboard
              </p>
            </Link>
            <div className="md:hidden">
              <Login />
            </div>
          </div>
          <div className="md:flex hidden">
            <Login />
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
