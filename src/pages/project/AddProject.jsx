import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header, DateInput, MultiSelect } from "../../components";
import { useStateContext } from "../../context";

const AddProject = () => {
  const navigate = useNavigate();
  const { currentColor, user } = useStateContext();

  const [allUser, setAllUser] = useState(null);
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
    members: [],
  });

  const getAllUser = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const { users } = await res.json();
      const userForState = users.map((user) => {
        return { value: user._id, label: user.name };
      });
      setAllUser(userForState);
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.id]: e.target.value });
  };

  const handleChangeForSelect = (selectedOption) => {
    const members = selectedOption.map((user) => user.value);
    setProject({ ...project, members });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/projects`,
        {
          method: "POST",
          body: JSON.stringify(project),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await res.json();
      if (data.hasOwnProperty("msg")) {
        toast.error(data.msg);
      }
      if (data.hasOwnProperty("project")) {
        toast.success("Successfully Created. Make Sure to Add tasks on it.");
        navigate(`/dashboard/projects/addsubtasks/${data.project._id}`);
      }
      console.log();
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-main-dark-bg rounded-3xl dark:text-white">
      <Header category={"Page"} title="Create Projects" />
      <h1 className="text-4xl text-center font-semibold mb-4 pb-2">
        Create Project
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
              value={project.name}
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
              value={project.description}
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
                value={project.startDate}
                onChange={(date) => setProject({ ...project, startDate: date })}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="text-gray-500">
                End Date
              </label>
              <DateInput
                value={project.endDate}
                onChange={(date) => setProject({ ...project, endDate: date })}
              />
            </div>
          </div>
          <br />
          <div>
            <label htmlFor="members" className="text-gray-500">
              Members
            </label>
            <MultiSelect
              isMulti={true}
              options={allUser}
              onChange={handleChangeForSelect}
            />
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

export default AddProject;
