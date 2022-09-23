import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import Button from "./Button";
import { userProfileData } from "../data/dummy";

const UserProfile = () => {
  const { currentColor, setUser, user, setIsClicked, initialState } =
    useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem("auth");
    setUser(null);
    // redire to home page
    navigate("/");
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<i className="fa-solid fa-xmark"></i>}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <div>
          <p className="font-semibold capitalize text-xl dark:text-gray-200">
            {user.user.name}
          </p>
          <p className="text-gray-500 text-sm capitalize dark:text-gray-400">
            {user.user.role}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {user.user.email}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
            onClick={() => {
              navigate(item.path);
              setIsClicked(initialState);
            }}
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          onClick={() => {
            logout();
            setIsClicked(initialState);
          }}
          className="p-3 w-full hover:drop-shadow-xl"
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
