import React, { useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { useStateContext } from "../context";
import { SideNav, Footer, DashBoardHeader, ThemeSettings } from "../components";
import { AddProject, EditProject, ProjectDetail, Projects } from "./project";
import { Tasks, AddTasks, EditTasks, TasksDetail } from "./task";
import { AddSubTasks, EditSubTasks, SubTaskDetail } from "./subtask";
import { Profile } from "./account";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    user,
  } = useStateContext();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <button
            type="button"
            onClick={() => setThemeSettings(true)}
            style={{ background: currentColor, borderRadius: "50%" }}
            className="text-2xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <i className="fa-solid fa-gear"></i>
          </button>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <SideNav />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <SideNav />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <DashBoardHeader />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}

            {/* pages  */}
            <Routes>
              {/* tasks crud  */}
              <Route path="/" element={<Tasks />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/add" element={<AddTasks />} />
              <Route path="/tasks/:id" element={<TasksDetail />} />
              <Route path="/tasks/edit/:id" element={<EditTasks />} />

              {/* profile  */}
              <Route path="/profile" element={<Profile />} />

              {/* projects crud */}
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/projects/add" element={<AddProject />} />
              <Route path="/projects/edit/:id" element={<EditProject />} />

              {/* subtasks  */}
              <Route
                path="/projects/addsubtasks/:id"
                element={<AddSubTasks />}
              />
              <Route
                path="/projects/subtasks/:id"
                element={<SubTaskDetail />}
              />
              <Route
                path="/:projectId/subtasks/edit/:id"
                element={<EditSubTasks />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
