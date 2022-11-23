import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import Dashboard from "../dashboard/Dashboard";
const Layout = function () {
  return (
    <>
      <Header />
      <Dashboard />
      <Sidebar />
    </>
  );
};

export default Layout;
