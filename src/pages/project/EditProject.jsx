import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context";
import { Header, DateInput } from "../../components";

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentColor, user } = useStateContext();

  const [editProject, setEditProject] = useState({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
    members: [],
    status: "",
  });

  const fetchData = async () => {
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
      const {
        project: { name, description, startDate, endDate, status },
      } = await res.json();
      setEditProject({ name, description, startDate, endDate, status });
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setEditProject({ ...editProject, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/projects/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(editProject),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await res.json();
      if (data.hasOwnProperty("msg")) {
        toast.error(data.msg);
      } else {
        toast.success("Successfully Edited");
        navigate("/dashboard/projects");
      }
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
      <Header category={"Page"} title="Edit Projects" />
      <h1 className="text-4xl text-center font-semibold mb-4 pb-2">
        Edit Project
      </h1>
      <div className="w-full flex justify-center flex-col">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-gray-500">
              Project Name
            </label>

            <input
              type="text"
              id="name"
              className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white border-[2px] w-full rounded-md px-3 py-2"
              value={editProject.name}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="description" className="text-gray-500">
              Description
            </label>

            <textarea
              id="description"
              className="dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white border-[2px] w-full rounded-md px-3 py-2"
              value={editProject.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="text-gray-500">
                Start Date
              </label>
              <DateInput
                value={new Date(editProject.startDate)}
                onChange={(date) =>
                  setEditProject({ ...editProject, startDate: date })
                }
              />
            </div>
            <div>
              <label htmlFor="endDate" className="text-gray-500">
                End Date
              </label>
              <DateInput
                value={new Date(editProject.endDate)}
                onChange={(date) =>
                  setEditProject({ ...editProject, endDate: date })
                }
              />
            </div>
          </div>
          <br />

          <div>
            <label htmlFor="status" className="text-gray-500">
              Status
            </label>

            <select
              id="status"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={editProject.status}
              onChange={handleChange}
            >
              <option value="to-do">To-Do</option>
              <option value="done">Done</option>
            </select>
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
              Edit Task
            </button>
            <Link to="/dashboard/projects">
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

export default EditProject;
