import { Outlet } from "react-router-dom";
import Sidebar from "./ui/Sidebar";
import Navbar from "./ui/Navbar";

import { Toaster } from "react-hot-toast";


// Layout.tsx
function Layout() {



  
  return (
    <div className="flex h-screen w-full overflow bg-surface-2">
      {/* Sidebar — visible on md and above */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Right side: Navbar (mobile only) + page content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar — visible on small screens only */}
        <div className="md:hidden">
          <Navbar />
        </div>

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
      <Toaster  position="bottom-center" />
    </div>
  );
}

export default Layout;
