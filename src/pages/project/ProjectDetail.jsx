import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context";
import { toast } from "react-toastify";
import { Header } from "../../components";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, currentColor } = useStateContext();
  const [project, setProject] = useState(null);
  const [subTasks, setSubTasks] = useState([]);
  const [error, setError] = useState();
  const getProject = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/projects/${id}`,
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
        toast.error("This project is not allow for you");
        setError(
          `This project is not allow for you. Only project member can see it.`
        );
      }
      if (data.hasOwnProperty("project")) {
        setProject(data.project);
      }
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  const getAllTaskForProject = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/subTasks?project=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await res.json();
      setSubTasks(data.subTask);
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
    getAllTaskForProject();
    // eslint-disable-next-line
  }, []);

  const handleClickForDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/subTasks/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const result = await res.json();
      console.log(result);
      if (result.hasOwnProperty("msg")) {
        toast.error("You are not authorized to do this actions");
      }
      if (result.success) {
        setSubTasks(subTasks.filter((task) => task._id !== id));
        toast.success("Successfully Deleted.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-main-dark-bg rounded-3xl dark:text-white">
      <Header category={"Page"} title="Detail About the Project" />
      {error ? (
        <>
          <h1 className="text-3xl font-semibold">{error}</h1> <br />
        </>
      ) : (
        <>
          {project && (
            <>
              <h1 className="text-3xl font-semibold capitalize">
                Title: {project.name}
              </h1>
              <br />
              <p>Description: {project.description}</p>
              <br />
              <p>Status: {project.status}</p>
              <br />
              <p>Start Date: {new Date(project.startDate).toString()}</p>
              <br />
              <p>End Date: {new Date(project.endDate).toString()}</p>
              <br />
              <p>Duration: {project.duration / 86400000} Days</p>
              <br />
              <p>Members: {project.members.map((user) => user.name + ", ")}</p>
              <br />
              <p>Created At: {new Date(project.createdAt).toString()}</p>
              <br />
              <p>Updated At: {new Date(project.updatedAt).toString()}</p>
              <br />
              <h1 className="text-3xl font-semibold capitalize">
                Sub-Task For this Project
              </h1>
              <br />
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {subTasks &&
                  subTasks.map((task) => {
                    return (
                      <div
                        className="w-full rounded-lg shadow-lg p-4 border cursor-pointer relative "
                        key={task._id}
                      >
                        <span className="capitalize">
                          Member: {task.member.name}
                        </span>{" "}
                        <br />
                        <Link
                          className="hover:underline capitalize"
                          to={`/dashboard/projects/subtasks/${task._id}`}
                        >
                          {task.status === "done" ? (
                            <strike>Tasks Title: {task.title}</strike>
                          ) : (
                            <span>Tasks Title: {task.title}</span>
                          )}
                        </Link>
                        <br />
                        <button
                          className="mt-4 px-3 py-2 rounded-lg text-white"
                          style={{
                            backgroundColor: currentColor,
                          }}
                          onClick={() =>
                            navigate(`/dashboard/projects/subtasks/${task._id}`)
                          }
                        >
                          Detail
                        </button>
                        {user.user.role === "admin" ? (
                          <div className="absolute right-4 top-4">
                            <Link
                              to={`/dashboard/${id}/subtasks/edit/${task._id}`}
                            >
                              <i className="fa-solid fa-pen-to-square text-xl mr-4"></i>
                            </Link>
                            <i
                              className="fa-solid fa-trash text-xl"
                              onClick={() => handleClickForDelete(task._id)}
                            ></i>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
              </div>
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
        onClick={() => navigate(`/dashboard/projects`)}
      >
        Back
      </button>
    </div>
  );
};

export default ProjectDetail;
