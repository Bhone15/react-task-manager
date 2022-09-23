import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const handleClick = () => {
    setDropDownOpen(!dropDownOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="w-screen mx-auto p-4 px-10">
        <div className="flex justify-between items-center">
          <div>
            <Link to={"/"} className="font-semibold text-3xl">
              Task Manager
            </Link>
          </div>
          <div className="hidden md:flex space-x-3 font-semibold text-lg">
            <a className="py-2" href="!#">
              Soruce Code
            </a>
            <Link
              className="btn bg-blue-500 px-4 rounded-md py-2 text-white"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="btn border-blue-500 px-4 rounded-md py-2 border"
              to={"/register"}
            >
              Register
            </Link>
          </div>
          {/* mobile  */}
          <div className="md:hidden">
            <div
              className="relative btn px-2 y-1 rounded-md border-[3px] cursor-pointer"
              onClick={handleClick}
            >
              <i className="fa-solid fa-bars text-xl"></i>
              {dropDownOpen && (
                <div className="absolute top-10 right-0 w-[170px] bg-gray-100 shadow-lg rounded-md text-gray-500 font-semibold border-2">
                  <ul className="flex flex-col">
                    <Link to={"/login"}>
                      <li className="pl-3 py-2 hover:bg-gray-200 transition ease-in-out">
                        <i className="fa-solid fa-right-to-bracket mx-2 text-xl"></i>{" "}
                        Login
                      </li>
                    </Link>
                    <hr />
                    <Link to={"/register"}>
                      <li className="pl-3 py-2 hover:bg-gray-200 transition ease-in-out">
                        <i className="fa-solid fa-user-plus mx-2 text-xl"></i>{" "}
                        Register
                      </li>
                    </Link>
                    <hr />
                    <a href="!#">
                      <li className="pl-3 py-2 hover:bg-gray-200 transition ease-in-out">
                        <i className="fa-brands fa-github mx-2 text-xl"></i>{" "}
                        Source Code
                      </li>
                    </a>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
