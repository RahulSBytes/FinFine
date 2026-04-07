import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useThemeStore } from "../../store/useThemeStore.ts";
import { useTransactionStore } from "../../store/useTransactionStore.ts";
import { Moon, Sun, Menu, ShieldCheck, ChevronLeft, Eye } from "lucide-react";
import { navs } from "../../constants/constants.ts";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();
  const { role, setRole } = useTransactionStore();

  return (
    <aside
      className={`
        h-screen sticky top-0 z-40 flex flex-col
        bg-surface border-r border-strong
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-56"}
      `}
    >
      <div className="flex items-center justify-between h-12 px-3 border-b border-strong shrink-0">
        {!collapsed && (
          <Link to="/" className="text-xl font-semibold truncate">
            Fin<span className="text-brand">Flow</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="cursor-pointer p-1 rounded-md hover:bg-surface-2 transition-colors ml-auto"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>


      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-1">
        {navs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium
               transition-colors duration-150 cursor-pointer
               ${
                 isActive
                   ? "bg-brand-100 text-brand border border-brand-500/60"
                   : "text-gray-500 hover:bg-surface-2 hover:text-gray-800 border border-transparent"
               }
               ${collapsed ? "justify-center" : ""}`
            }
          >
            {Icon && <Icon size={18} className="shrink-0" />}
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-strong px-3 py-3 shrink-0 flex flex-col gap-1">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to Light" : "Switch to Dark"}
          className={`flex items-center gap-3 w-full px-2 py-2 rounded-md text-sm font-medium
      text-gray-500 hover:bg-surface-2 hover:text-gray-800 transition-colors cursor-pointer
      ${collapsed ? "justify-center" : ""}`}
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} fill="yellow" />}
          {!collapsed && <span>{isDark ? "Dark Mode" : "Light Mode"}</span>}
        </button>

        {/* Role Toggle */}
        <button
          onClick={() => setRole(role === "admin" ? "viewer" : "admin")}
          title={`Switch to ${role === "admin" ? "Viewer" : "Admin"}`}
          className={`flex items-center gap-3 w-full px-2 py-2 rounded-md text-sm font-medium
      text-gray-500 hover:bg-surface-2 hover:text-gray-800 transition-colors cursor-pointer
      ${collapsed ? "justify-center" : ""}`}
        >
          {role === "admin" ? (
            <ShieldCheck size={18} className="text-brand" />
          ) : (
            <Eye size={18} />
          )}
          {!collapsed && (
            <span>{role === "admin" ? "Admin Mode" : "Viewer Mode"}</span>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
