import React, { useState } from "react";
import { useStateContext } from "../context";
import { toast } from "react-toastify";

const UpdateUserInfoForm = ({ setClickedInfoBtn }) => {
  const { currentColor, user, setUser } = useStateContext();

  const [updateUser, setUpdateUser] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/updateUser`,
        {
          method: "PATCH",
          body: JSON.stringify(updateUser),
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
      if (data.user) {
        toast.success("Successfully Updated");
        setClickedInfoBtn(false);
        setUpdateUser({
          name: "",
          email: "",
        });
        const updatedUser = { user: data.user, token: user.token };
        setUser(updatedUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="text-gray-500">
          Name
        </label>
        <br />
        <input
          type="text"
          id="name"
          className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white border-[2px] w-full rounded-md px-3 py-2"
          value={updateUser.name}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <label htmlFor="newPassword" className="text-gray-500">
          Email
        </label>
        <br />
        <input
          type="email"
          id="email"
          className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white border-[2px] w-full rounded-md px-3 py-2"
          value={updateUser.email}
          onChange={handleChange}
        />
      </div>

      <br />
      <div>
        <button
          type="submit"
          className="mb-4 px-3 mr-4 py-2 rounded-lg text-white"
          style={{
            backgroundColor: currentColor,
          }}
        >
          Submit
        </button>
        <button
          className="mb-4 px-3 py-2 rounded-lg text-white"
          style={{
            backgroundColor: currentColor,
          }}
          onClick={() => setClickedInfoBtn(false)}
        >
          Close Form
        </button>
      </div>
    </form>
  );
};

export default UpdateUserInfoForm;
