import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateContext } from "../../context";
import { Header, MultiSelect } from "../../components";

const AddSubTasks = () => {
  const { id } = useParams();
  const { user, currentColor } = useStateContext();
  const [members, setMembers] = useState([]);
  const [subTasks, setSubTasks] = useState({
    title: "",
    description: "",
    member: "",
    project: id,
  });

  const getMember = async () => {
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
        project: { members },
      } = await res.json();
      const memberForState = members.map((member) => {
        return { value: member._id, label: member.name };
      });
      setMembers(memberForState);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeForSelect = (selectedOption) => {
    setSubTasks({ ...subTasks, member: selectedOption.value });
  };

  const handleChange = (e) => {
    setSubTasks({ ...subTasks, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/subTasks`,
        {
          method: "POST",
          body: JSON.stringify(subTasks),
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
      if (data.hasOwnProperty("subTask")) {
        toast.success("successfully created task for project");
        setSubTasks({
          title: "",
          description: "",
          member: "",
          project: id,
        });
      }
      console.log(data);
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  useEffect(() => {
    getMember();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-main-dark-bg rounded-3xl dark:text-white">
      <Header category={"Page"} title="Create Tasks For Project" />
      <h1 className="text-4xl text-center font-semibold mb-4 pb-2">
        Create Tasks
      </h1>
      <div className="w-full flex justify-center flex-col">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="text-gray-500">
              Task Title
            </label>

            <input
              type="text"
              id="title"
              className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white border-[2px] w-full rounded-md px-3 py-2"
              value={subTasks.title}
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
              value={subTasks.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <br />
          <div>
            <label htmlFor="members" className="text-gray-500">
              Members
            </label>
            <MultiSelect
              isMulti={false}
              options={members}
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

export default AddSubTasks;
