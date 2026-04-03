import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navs } from "../../constants/constants.ts";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <nav className="border border-strong flex-between h-12 px-3">
      <div className="text-xl font-semibold">
        Fin<span className="text-brand ">Flow</span>
      </div>
      <div className="flex gap-4">
        <div
          className="cursor-pointer"
          onClick={() => setIsDark((prev) => !prev)}
        >
          {isDark ? <Moon fill="" /> : <Sun fill="yellow" />}
        </div>
        <div
          className="cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {!menuOpen && <Menu />}
        </div>
      </div>

      {menuOpen && (
        <section className=" w-full h-screen absolute top-0 right-0 bg-white/20">
          <div className="h-full bg-surface p-4 w-full max-w-96 absolute right-0 border-l border-strong">
            <div
              className=" flex justify-end"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <X className="mb-4 cursor-pointer" />
            </div>
            <ul className="flex flex-col gap-3">
              {navs.map(({ to, label }) => (
                <li
                  key={to}
                  className=" rounded-sm p-2 bg-surface cursor-pointer"
                >
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      isActive ? "text-brand font-semibold" : "text-gray-500"
                    }
                  >
                    {label}{" "}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </nav>
  );
}

export default Navbar;
