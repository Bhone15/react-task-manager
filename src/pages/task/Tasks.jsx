import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStateContext } from "../../context";
import { toast } from "react-toastify";
import { Header } from "../../components";

const Tasks = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const user = JSON.parse(window.localStorage.getItem("auth"));
  const { currentColor } = useStateContext();

  const getObjectforFetch = (method) => {
    return {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
  };

  const handleClickForDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/tasks/${id}`,
        getObjectforFetch("DELETE")
      );
      const result = await res.json();
      if (result.success) {
        setData(data.filter((task) => task._id !== id));
        toast.success("Successfully Deleted.");
      }
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const tasks = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/tasks`,
        getObjectforFetch("GET")
      );
      const data = await tasks.json();
      setData(data.tasks);
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-main-dark-bg rounded-3xl dark:text-white">
      <Header category={"Page"} title="Create Your Own Tasks" />
      <button
        className="mb-4 px-3 py-2 rounded-lg text-white"
        style={{
          backgroundColor: currentColor,
        }}
        onClick={() => {
          navigate("/dashboard/tasks/add");
        }}
      >
        Create Task
      </button>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {data &&
          data.map((task) => {
            return (
              <div
                className="w-full rounded-lg shadow-lg p-4 border cursor-pointer relative "
                key={task._id}
              >
                <Link
                  className="hover:underline"
                  to={`/dashboard/tasks/${task._id}`}
                >
                  {task.status === "done" ? (
                    <strike>{task.title}</strike>
                  ) : (
                    <span>{task.title}</span>
                  )}
                </Link>
                <br />
                <button
                  className="mt-4 px-3 py-2 rounded-lg text-white"
                  style={{
                    backgroundColor: currentColor,
                  }}
                  onClick={() => navigate(`/dashboard/tasks/${task._id}`)}
                >
                  Detail
                </button>
                <div className="absolute right-4 top-4">
                  <Link to={`/dashboard/tasks/edit/${task._id}`}>
                    <i className="fa-solid fa-pen-to-square text-xl mr-4"></i>
                  </Link>
                  <i
                    className="fa-solid fa-trash text-xl"
                    onClick={() => handleClickForDelete(task._id)}
                  ></i>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Tasks;
