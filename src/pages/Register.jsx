import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, password };
    setLoading(true);
    const data = await register(user);
    if (data.hasOwnProperty("msg")) {
      toast.error(data.msg);
    }
    if (data.user) {
      toast.success("Successfull Registered, You Can Now Login.");
      navigate("/login");
    }
  };

  const register = async (user) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/register`,
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="mt-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-xl border-b-4 mb-4 pb-2 border-blue-500">
          Register Form
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-gray-500">
              Name
            </label>
            <br />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="border-[2px] rounded-md px-3 py-2 w-[250px] sm:w-[500px]"
            />
          </div>
          <br />
          <div>
            <label htmlFor="email" className="text-gray-500">
              Email
            </label>
            <br />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border-[2px] rounded-md px-3 py-2 w-[250px] sm:w-[500px]"
            />
          </div>
          <br />
          <div>
            <label htmlFor="password" className="text-gray-500">
              Password
            </label>
            <br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-[2px] rounded-md px-3 py-2 w-[250px] sm:w-[500px]"
            />
          </div>
          <br />

          <Link to={"/login"} className="text-right underline text-blue-800">
            Already Member? Login
          </Link>
          <br />

          <button className="px-4 py-2 bg-blue-400 rounded-md text-lg">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
