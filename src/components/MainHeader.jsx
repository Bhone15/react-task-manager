import React from "react";
import { useStateContext } from "../context";
import NavBar from "./NavBar";

const MainHeader = () => {
  const { user } = useStateContext();

  return <>{user ? null : <NavBar />}</>;
};

export default MainHeader;
