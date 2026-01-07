import { NavLink } from "react-router-dom";
import { SiHomeadvisor } from "react-icons/si";
import { CiLogout } from "react-icons/ci";

export function Header() {
  return (
    <header className="w-full bg-gray-500 rounded-lg flex justify-between py-3 px-6 mt-8 text-white items-center mb-15">
      <div className="flex gap-2 items-center">
        <SiHomeadvisor className="text-white hidden md:block" size={25} />
        <p className="font-bold text-lg hidden md:block">AlugaLar</p>
      </div>
      <div className="flex gap-3 items-center">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            ` p-2 rounded-lg hover:bg-zinc-700 duration-300 ${isActive ? "bg-zinc-700" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/myhouses"
          className={({ isActive }) =>
            ` p-2 rounded-lg hover:bg-zinc-700 duration-300 ${isActive ? "bg-zinc-700" : ""}`
          }
        >
          Minhas casas
        </NavLink>
        <NavLink
          to="/newhouse"
          className={({ isActive }) =>
            ` p-2 rounded-lg hover:bg-zinc-700 duration-300 ${isActive ? "bg-zinc-700" : ""}`
          }
        >
          Nova casa
        </NavLink>
      </div>
      <NavLink
        to="/"
        className="p-2 rounded-lg hover:bg-zinc-700 duration-300 flex items-center gap-2 cursor-pointer ml-2"
      >
        <CiLogout />
        Sair
      </NavLink>
    </header>
  );
}
