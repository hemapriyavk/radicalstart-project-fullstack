import { ChevronLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* title */}
      <div className="flex items-center space-x-2 mb-6">
        <ChevronLeft
          onClick={() => navigate("/")}
          className="cursor-pointer text-[var(--color-gray-900)] w-12 h-12"
        />
        <h1 className="text-4xl font-semibold">{title}</h1>
      </div>

      {/* Personal Information */}
      <div className="flex items-center border-b border-[var(--color-gray-300)] pb-2">
        <User className="w-6 h-6 text-[var(--color-blue-500)] font-extrabold mr-3" />
        <h3 className="text-[var(--color-blue-500)] text-2xl font-bold">
          Personal Information
        </h3>
      </div>
      <hr className="border-[var(--color-blue-500)] border-2 w-72" />
    </div>
  );
};

export default PageHeader;
