import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateContext } from "../../context";
import { Header } from "../../components";

const SubTaskDetail = () => {
  const navigate = useNavigate();
  const { id: taskId } = useParams();
  const { user, currentColor } = useStateContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  const getSubTask = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/subTasks/${taskId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await res.json();
      if (data.hasOwnProperty("msg")) {
        toast.error("This task is not allow for you");
        setError(`This task is not allow for you.`);
      }
      if (data.hasOwnProperty("subTask")) {
        setData(data.subTask);
      }
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  useEffect(() => {
    getSubTask();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-main-dark-bg rounded-3xl dark:text-white">
      <Header category={"Page"} title="Deatail about your task." />

      {error ? (
        <>
          <h1 className="text-3xl font-semibold">{error}</h1> <br />
        </>
      ) : (
        <>
          {data && (
            <>
              <h1 className="text-3xl font-semibold">Title: {data.title}</h1>
              <br />
              <p>Description: {data.description}</p>
              <br />
              <p>Status: {data.status}</p>
              <br />
              <p>Start Date: {new Date(data.startDate).toString()}</p>
              <br />
              <p>End Date: {new Date(data.endDate).toString()}</p>
              <br />
              <p>Duration: {data.duration / 86400000} Days</p>
              <br />
              <p>Created At: {new Date(data.createdAt).toString()}</p>
              <br />
              <p>Updated At: {new Date(data.updatedAt).toString()}</p>
              <br />
            </>
          )}
        </>
      )}
      <button
        className="mb-4 px-3 py-2 rounded-lg text-white"
        style={{
          backgroundColor: currentColor,
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default SubTaskDetail;
