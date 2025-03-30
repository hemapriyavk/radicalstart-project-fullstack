import { Settings, Bell } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full py-5.5 flex justify-end items-center px-6 border-b border-[var(--color-gray-300)] shadow-sm bg-[var(--color-white)]">
      <div className="flex items-center pr-5 space-x-7">
        <Settings className="w-10 h-10 text-[var(--color-gray-800)] cursor-pointer hover:text-[var(--color-gray-500)] bg-[var(--color-gray-200)] rounded-full p-2" />
        <Bell className="w-10 h-10 text-[var(--color-gray-800)] cursor-pointer hover:text-[var(--color-gray-500)] bg-[var(--color-gray-200)] rounded-full p-2" />
        <img
          src="https://randomuser.me/api/portraits/women/76.jpg"
          alt="profile-icon"
          className="w-10 h-10 rounded-full bg-[var(--color-gray-300)] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
