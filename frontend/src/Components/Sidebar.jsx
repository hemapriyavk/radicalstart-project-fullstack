import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Users, Calendar, MessageSquare, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  const [active, setActive] = useState("Employee");

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Employee", icon: Users, path: "/" },
    { name: "Calendar", icon: Calendar, path: "/calender" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
  ];

  return (
    <div className="w-80 h-screen bg-[var(--color-gray-100)] flex flex-col border-r border-[var(--color-gray-300)]">
      {/* logo */}
      <h1 className="text-3xl font-bold text-[var(--color-blue-500)] border-b border-[var(--color-gray-300)] py-6 px-10 w-full">
        RS-TECH
      </h1>

      {/* sidebars */}
      <ul className="mt-8 space-y-3 pr-10">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={`flex items-center space-x-3 pl-10 py-3 pr-5 rounded-lg cursor-pointer transition-all ${
              active === item.name
                ? "bg-[var(--color-blue-500)] text-[var(--color-white)] rounded-r-full"
                : "hover:bg-[var(--color-gray-200)] text-[var(--color-gray-400)]"
            }`}
            onClick={() => setActive(item.name)}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
