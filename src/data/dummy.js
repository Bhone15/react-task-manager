export const links = [
  {
    title: "Pages",
    links: [
      {
        name: "dashboard/tasks",
        icon: <i className="fa-solid fa-list-check"></i>,
      },
      {
        name: "dashboard/projects",
        icon: <i className="fa-solid fa-diagram-project"></i>,
      },
    ],
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const userProfileData = [
  {
    icon: <i className="fa-solid fa-user"></i>,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    path: "/dashboard/profile",
  },
  {
    icon: <i className="fa-solid fa-list-check"></i>,
    title: "My Tasks",
    desc: "To-do and Daily Tasks",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    path: "/dashboard/tasks",
  },
];
