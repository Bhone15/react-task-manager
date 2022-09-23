import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateContext } from "../../context";
import { Header } from "../../components";

const EditTasks = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentColor, user } = useStateContext();
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    status: "",
  });
  // const user = JSON.parse(window.localStorage.getItem("auth"));

  const fetchTask = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/tasks/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const result = await res.json();
      setEditTask({
        title: result.task.title,
        description: result.task.description,
        status: result.task.status,
      });
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/tasks/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return await res.json();
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setEditTask({ ...editTask, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await updateTask(editTask);
    if (data.hasOwnProperty("msg")) {
      toast.error(data.msg);
    } else {
      toast.success("Successfully Edited");
      navigate("/dashboard/tasks");
    }
  };

  useEffect(() => {
    fetchTask();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-main-dark-bg rounded-3xl dark:text-white">
      <Header category={"Page"} title="Edit Your Own Tasks" />
      <h1 className="text-4xl text-center font-semibold mb-4 pb-2">
        Edit Task
      </h1>
      <div className="w-full flex justify-center flex-col">
        {editTask && (
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
                defaultValue={editTask.title}
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
                value={editTask.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <br />
            <label htmlFor="status" className="text-gray-500">
              Status
            </label>

            <select
              id="status"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={editTask.status}
              onChange={handleChange}
            >
              <option value="to-do">To-Do</option>
              <option value="done">Done</option>
            </select>
            <br />
            <div>
              <button
                type="submit"
                className="px-4 py-2 rounded-md text-lg mr-4"
                style={{
                  backgroundColor: currentColor,
                }}
              >
                Edit Task
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
        )}
        <br />
      </div>
    </div>
  );
};

export default EditTasks;
