import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context";
import { toast } from "react-toastify";
import { Header } from "../../components";

const Projects = () => {
  const navigate = useNavigate();
  const { user, currentColor } = useStateContext();
  const [projects, setProjects] = useState([]);

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
        `${process.env.REACT_APP_API_URL}/api/v1/projects/${id}`,
        getObjectforFetch("DELETE")
      );
      const result = await res.json();
      console.log(result);
      if (result.hasOwnProperty("msg")) {
        toast.error("You are not authorized to do this actions");
      }
      if (result.success) {
        setProjects(projects.filter((project) => project._id !== id));
        toast.success("Successfully Deleted.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProject = async () => {
    try {
      const project = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/projects`,
        getObjectforFetch("GET")
      );
      const result = await project.json();
      setProjects(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProject();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-main-dark-bg rounded-3xl dark:text-white">
      <Header category={"Page"} title="All Projects" />
      {user.user.role === "admin" ? (
        <button
          className="mb-4 px-3 py-2 rounded-lg text-white"
          style={{
            backgroundColor: currentColor,
          }}
          onClick={() => navigate("/dashboard/projects/add")}
        >
          Create Project
        </button>
      ) : null}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {projects &&
          projects.map((project) => {
            return (
              <div
                className="w-full rounded-lg shadow-lg p-4 border cursor-pointer relative "
                key={project._id}
              >
                <Link
                  className="hover:underline"
                  to={`/dashboard/projects/${project._id}`}
                >
                  {project.status === "done" ? (
                    <strike>{project.name}</strike>
                  ) : (
                    <span>{project.name}</span>
                  )}
                </Link>
                <br />
                <button
                  className="mt-4 px-3 py-2 rounded-lg text-white"
                  style={{
                    backgroundColor: currentColor,
                  }}
                  onClick={() => navigate(`/dashboard/projects/${project._id}`)}
                >
                  Detail
                </button>
                {user.user.role === "admin" ? (
                  <div className="absolute right-4 top-4">
                    <Link to={`/dashboard/projects/edit/${project._id}`}>
                      <i className="fa-solid fa-pen-to-square text-xl mr-4"></i>
                    </Link>
                    <i
                      className="fa-solid fa-trash text-xl"
                      onClick={() => handleClickForDelete(project._id)}
                    ></i>
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Projects;
