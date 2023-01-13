import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

const DashboardLayout = function () {
  return (
    <>
      <Header />
      <Outlet />
      <Sidebar />
    </>
  );
};

export default DashboardLayout;
