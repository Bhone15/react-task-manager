import React, { useState } from "react";
import { useStateContext } from "../context";
import { toast } from "react-toastify";

const UpdatePasswordForm = ({ setClickedPasswordBtn }) => {
  const { currentColor, user } = useStateContext();

  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handlePassswordChange = (e) => {
    setUpdatePassword({ ...updatePassword, [e.target.id]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/updateUserPassword`,
        {
          method: "PATCH",
          body: JSON.stringify(updatePassword),
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
      if (data.success) {
        toast.success(data.success);
        setClickedPasswordBtn(false);
        setUpdatePassword({
          oldPassword: "",
          newPassword: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center flex-col">
      <form className="flex flex-col" onSubmit={handlePasswordSubmit}>
        <div>
          <label htmlFor="oldPassword" className="text-gray-500">
            Old Password
          </label>
          <br />
          <input
            type="password"
            id="oldPassword"
            className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white border-[2px] w-full rounded-md px-3 py-2"
            value={updatePassword.oldPassword}
            onChange={handlePassswordChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="newPassword" className="text-gray-500">
            New Password
          </label>
          <br />
          <input
            type="password"
            id="newPassword"
            className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white border-[2px] w-full rounded-md px-3 py-2"
            value={updatePassword.newPassword}
            onChange={handlePassswordChange}
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
            onClick={() => setClickedPasswordBtn(false)}
          >
            Close Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
