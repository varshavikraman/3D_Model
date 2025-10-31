import { NavLink, useNavigate } from "react-router-dom";
import { Home, Upload } from "lucide-react";
import logo from "../assets/images/logo-design3d.png";

const Sidebar = () => {

  return (
    <>
      <div className="hidden lg:flex flex-col h-screen bg-gradient-to-br from-[#0a0f24] to-black text-white w-20 py-6 items-center">
        
        <img src={logo} alt="Logo" className="h-12 mb-10" />

        <nav className="flex flex-col items-center gap-6">
          <NavItem to="/home" icon={<Home size={22} />} label="Home" />
          <NavItem to="/upload" icon={<Upload size={22} />} label="Upload" />
        </nav>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-br from-[#0a0f24] to-black text-white border-t border-gray-800 shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          <NavItem to="/home" icon={<Home size={22} />} label="Home" />
          <NavItem to="/upload" icon={<Upload size={22} />} label="Upload" />
        </div>
      </div>

      <div className="lg:hidden fixed top-0 left-0 right-0 flex justify-center items-center bg-gradient-to-br from-[#0a0f24] to-black py-3 border-b border-gray-800 z-50">
        <img src={logo} alt="Logo" className="h-10" />
      </div>

    </>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <div className="group relative">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center justify-center text-gray-300 hover:text-purple-600 transition-all ${
            isActive ? "text-purple-500" : ""
          }`
        }
      >
        {icon}
      </NavLink>
      <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};

export default Sidebar;
