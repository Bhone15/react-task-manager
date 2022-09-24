import React from "react";

const Code = () => {
  return (
    <div className="m-4 p-4">
      <h1 className="text-2xl font-semibold">Task Manager</h1>
      <br />
      <p className="text-lg text-justify">
        &#160; &#160;&#160;&#160; This Project is built by react, tailwindcss
        for frontend and backend API for nodejs, express and mongodb. So this is
        like a MERN stack single page web application. Frontend Code are a
        little bit messy and it contains a lot of duplicated codes. I might use
        some state management system in future. For Backend API, I tried my best
        to get a clean and understandable code.
      </p>
      <br />
      <h1 className="text-xl">Frontend Code</h1>
      <br />
      <a
        href="https://github.com/Bhone15/react-task-manager.git"
        target={"_blank"}
        rel="noreferrer"
        className="underline text-blue-500"
      >
        https://github.com/Bhone15/react-task-manager.git
      </a>
      <br />
      <br />
      <h1 className="text-xl">Backend Code</h1>
      <br />
      <a
        href="https://github.com/Bhone15/node-task-manager-api.git"
        target={"_blank"}
        rel="noreferrer"
        className="underline text-blue-500"
      >
        https://github.com/Bhone15/node-task-manager-api.git
      </a>
      <br />
      <br />
      <h1 className="text-xl">Help Me By Filling This</h1>
      <br />
      <a
        className="underline text-blue-500"
        target={"_blank"}
        rel="noreferrer"
        href="https://forms.gle/Gf66HCGmQLNuepHj7"
      >
        https://forms.gle/Gf66HCGmQLNuepHj7
      </a>
    </div>
  );
};

export default Code;
