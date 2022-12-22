import Dashboard from "../dashboard/Dashboard";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

const DashboardLayout = function () {
  return (
    <>
      <Header />
      <Dashboard />
      <Sidebar />
    </>
  );
};

export default DashboardLayout;
