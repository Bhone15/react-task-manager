import React from "react";
import { Link } from "react-router-dom";
import home from "../data/home.png";

const Home = () => {
  return (
    <div className="grid grid-cols lg:grid-cols-2 gap-4 m-4">
      <div className="md:p-10 lg:p-18 xl:p-24 p-4 w-full">
        <h1 className="text-2xl md:text-5xl font-bold mb-6 lg:mt-10 text-center lg:text-left">
          Manage Your Own Tasks
        </h1>
        <p className="text-center lg:text-justify text-md lg:text-lg">
          My first full stack that i tried to escape from tutorial hell which is
          built by React, Tailwind, Express and Mongodb. Both frontend and
          backend are handling on my own and this project is built to use in my
          school assignment. Also help me by filling this{" "}
          <a
            className="hover:underline text-blue-500"
            target={"_blank"}
            rel="noreferrer"
            href="https://forms.gle/Gf66HCGmQLNuepHj7"
          >
            form.
          </a>
        </p>
        <div className="flex justify-center lg:justify-start mt-4">
          <Link
            to="/login"
            className="border py-3 px-5 rounded-lg text-white border-blue-500 bg-blue-500 text-lg"
          >
            Try App Now
          </Link>
        </div>
        <p className="mt-4 text-center lg:text-left">
          Code with 💙 by{" "}
          <a
            href="https://www.linkedin.com/in/bhone/"
            className="hover:underline text-blue-500"
            target={"_blank"}
            rel="noreferrer"
          >
            Bhone Pyae Aung.
          </a>
        </p>
      </div>

      <div className="md:p-10 p-4 w-full lg:mt-10">
        <img src={home} alt="home" className="border-2 rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Home;
