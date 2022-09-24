import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home, Login, Register, Code } from "./pages";
import MainHeader from "./components/MainHeader";
import Dashboard from "./pages/Dashboard";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = window.localStorage.getItem("auth");
    if (user) {
      return navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <MainHeader />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/code" element={<Code />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
