import React, { useState } from "react";
import {
  Header,
  UpdatePasswordForm,
  UpdateUserInfoForm,
} from "../../components";
import { useStateContext } from "../../context";

const Profile = () => {
  const { user, currentColor } = useStateContext();
  const [clickedInfoBtn, setClickedInfoBtn] = useState(false);
  const [clickedPasswordBtn, setClickedPasswordBtn] = useState(false);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-main-dark-bg rounded-3xl dark:text-white">
      <Header category={"Page"} title="Your Profile" />
      <div className="container">
        <h1 className="text-xl font-semibold capitalize mb-2">
          Name: {user.user.name}
        </h1>
        <h1 className="text-xl font-semibold mb-2">Email: {user.user.email}</h1>
        <h1 className="text-xl font-semibold capitalize mb-2">
          Role: {user.user.role}
        </h1>
        <div>
          <button
            className="mb-4 px-3 py-2 rounded-lg text-white"
            style={{
              backgroundColor: currentColor,
            }}
            onClick={() => setClickedInfoBtn(true)}
          >
            Update Information
          </button>
          {clickedInfoBtn && (
            <UpdateUserInfoForm setClickedInfoBtn={setClickedInfoBtn} />
          )}
        </div>
        <div>
          <button
            className="mb-4 px-3 py-2 rounded-lg text-white"
            style={{
              backgroundColor: currentColor,
            }}
            onClick={() => setClickedPasswordBtn(true)}
          >
            Update Password
          </button>
          {clickedPasswordBtn && (
            <UpdatePasswordForm setClickedPasswordBtn={setClickedPasswordBtn} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
