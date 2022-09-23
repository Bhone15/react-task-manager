import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateContext } from "../../context";
import { Header, MultiSelect } from "../../components";

const EditSubTasks = () => {
  const navigate = useNavigate();
  const { id: taskId, projectId } = useParams();
  const { currentColor, user } = useStateContext();
  const [members, setMembers] = useState([]);
  const [editSubTask, setEditSubTask] = useState({
    title: "",
    description: "",
    member: "",
    status: "",
  });

  const fetchTask = async () => {
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
      const {
        subTask: {
          title,
          description,
          member: { _id },
          status,
        },
      } = await res.json();
      setEditSubTask({
        title,
        description,
        member: _id,
        status,
      });
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  const getMember = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/projects/${projectId}`,
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
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  const handleChangeForSelect = (selectedOption) => {
    setEditSubTask({ ...editSubTask, member: selectedOption.value });
  };

  const handleChange = (e) => {
    setEditSubTask({ ...editSubTask, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(editSubTask));
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/subTasks/${taskId}`,
        {
          method: "PATCH",
          body: JSON.stringify(editSubTask),
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
        navigate(`/dashboard/projects/${projectId}`);
      }
    } catch (error) {
      toast.error("Try again. Check Your Network");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTask();
    getMember();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-main-dark-bg rounded-3xl dark:text-white">
      <Header category={"Page"} title="Edit Tasks For Project" />
      <h1 className="text-4xl text-center font-semibold mb-4 pb-2">
        Edit Tasks
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
              value={editSubTask.title}
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
              value={editSubTask.description}
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
            <label htmlFor="status" className="text-gray-500">
              Status
            </label>

            <select
              id="status"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={editSubTask.status}
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

            <button
              className="px-4 py-2 rounded-md text-lg"
              style={{
                backgroundColor: currentColor,
              }}
              onClick={() => navigate(`/dashboard/projects/${projectId}`)}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubTasks;
