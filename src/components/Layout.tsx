import { Outlet } from "react-router-dom";
import Sidebar from "./ui/Sidebar";
import Navbar from "./ui/Navbar";

function Layout() {
  return (
    <div className=" flex flex-col bg-surface-2 h-full md:h-screen w-full border border-red-500">
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout;
