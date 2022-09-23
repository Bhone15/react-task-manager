import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateContext } from "../../context";
import { Header } from "../../components";

const AddTasks = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  // const user = JSON.parse(localStorage.getItem("auth"));
  const { currentColor, user } = useStateContext();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createTask(task);
    if (data.hasOwnProperty("msg")) {
      toast.error(data.msg);
    } else {
      toast.success("Successfully Added");
      navigate("/dashboard/tasks");
    }
  };

  const createTask = async (task) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/tasks`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-main-dark-bg rounded-3xl dark:text-white">
      <Header category={"Page"} title="Create Your Own Tasks" />
      <h1 className="text-4xl text-center font-semibold mb-4 pb-2">
        Create Task
      </h1>
      <div className="w-full flex justify-center flex-col">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="text-gray-500">
              Task Title
            </label>
            <br />
            <input
              type="text"
              id="title"
              className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white border-[2px] w-full rounded-md px-3 py-2"
              value={task.title}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="description" className="text-gray-500">
              Description
            </label>
            <br />
            <textarea
              id="description"
              className="dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white border-[2px] w-full rounded-md px-3 py-2"
              value={task.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <br />

          <div>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-lg mr-4"
              style={{
                backgroundColor: currentColor,
              }}
            >
              Create Task
            </button>
            <Link to="/dashboard/tasks">
              <button
                className="px-4 py-2 rounded-md text-lg"
                style={{
                  backgroundColor: currentColor,
                }}
              >
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTasks;
