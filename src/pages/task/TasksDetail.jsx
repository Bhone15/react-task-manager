import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStateContext } from "../../context";
import { Header } from "../../components";

const TasksDetail = () => {
  const [data, setData] = useState(null);
  const { currentColor, user } = useStateContext();
  const { id } = useParams();
  // const user = JSON.parse(window.localStorage.getItem("auth"));

  const fetchData = async () => {
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
    setData(result);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-main-dark-bg rounded-3xl dark:text-white">
      <Header category={"Page"} title="Deatail about your task." />
      {data && (
        <>
          <h1 className="text-3xl font-semibold">Title: {data.task.title}</h1>
          <br />
          <p>Description: {data.task.description}</p>
          <br />
          <p>Status: {data.task.status}</p>
          <br />
          <p>Created At: {new Date(data.task.createdAt).toString()}</p>
          <br />
          <p>Updated At: {new Date(data.task.updatedAt).toString()}</p>
          <br />
          <button
            className="mb-4 px-3 py-2 rounded-lg text-white"
            style={{
              backgroundColor: currentColor,
            }}
          >
            <Link to="/dashboard/tasks">Back</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default TasksDetail;
