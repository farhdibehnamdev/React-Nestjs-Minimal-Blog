import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Dashboard from "../dashboard/Dashboard";

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
