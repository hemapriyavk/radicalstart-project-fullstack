import { useState, useEffect } from "react";
import { Eye, Edit, Trash, Search, CirclePlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmation from "../Components/DeleteConfirmation";
import axios from "axios";
import { backendUrl } from "../App";

const Employees = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${backendUrl}/all-employees`);
      if (response.data.success) {
        setEmployees(response.data.employees);
      } else {
        console.error("Error fetching employees:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await axios.delete(`${backendUrl}/delete/${employeeId}`);
      if (response.data.success) {
        setEmployees(employees.filter((emp) => emp.employee_id !== employeeId)); // Remove employee from state
        setShowModal(false);
      } else {
        console.error("Error deleting employee:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="w-full pl-3">
      {/* page header */}
      <div className="flex justify-between items-center mb-6">
        {/* title */}
        <h2 className="text-4xl font-bold my-5 text-[var(--color-gray-800)]">
          Employee
        </h2>
        {/* Right section */}
        <div className="flex space-x-4">
          {/* search input */}
          <div className="border border-[var(--color-gray-300)] shadow-lg px-2 py-3 rounded-lg flex items-center">
            <Search className="text-[var(--color-gray-500)] w-6 h-6 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="text-lg text-[var(--color-gray-700)]"
            />
          </div>
          {/* add button */}
          <button className="bg-[var(--color-blue-500)] text-[var(--color-white)] px-6 py-2 rounded-lg flex items-center space-x-2 text-lg">
            <Link to="/add">
              <span className="flex items-center">
                <CirclePlus className="mr-2" /> Add New Employee
              </span>
            </Link>
          </button>
        </div>
      </div>

      {/* employees details */}
      <div className="border rounded-lg overflow-hidden border-[var(--color-gray-300)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-[var(--color-gray-100)] text-left text-[var(--color-gray-600)] border-[var(--color-gray-300)] text-base">
              <th className="px-4 py-4">Employee Name</th>
              <th className="px-4 py-4">Employee ID</th>
              <th className="px-4 py-4">Department</th>
              <th className="px-4 py-4">Designation</th>
              <th className="px-4 py-4">Project</th>
              <th className="px-4 py-4">Type</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b hover:bg-[var(--color-gray-50)] border-[var(--color-gray-100)] text-[var(--color-gray-800)]"
                >
                  <td className="px-4 py-4 flex items-center space-x-2">
                    <img
                      src={emp.image}
                      alt={emp.name}
                      className="w-8 h-8 rounded-full object-cover object-top"
                    />
                    <span>{emp.name}</span>
                  </td>
                  <td className="px-4 py-4">{emp.employee_id}</td>
                  <td className="px-4 py-4">{emp.department}</td>
                  <td className="px-4 py-4">{emp.designation}</td>
                  <td className="px-4 py-4">{emp.project}</td>
                  <td className="px-4 py-4">{emp.type}</td>
                  <td className="px-4 py-4">{emp.status}</td>
                  <td className="px-4 py-4 flex space-x-3 items-center">
                    <Eye
                      onClick={() =>
                        navigate(`/employee/view/${emp.employee_id}`)
                      }
                      className="w-7 h-7 cursor-pointer text-[var(--color-gray-700)] hover:text-[var(--color-gray-500)]"
                    />
                    <Edit
                      onClick={() =>
                        navigate(`/employee/edit/${emp.employee_id}`)
                      }
                      className="w-6 h-6 cursor-pointer text-[var(--color-gray-700)] hover:text-[var(--color-gray-500)]"
                    />
                    <Trash
                      onClick={() => setShowModal(true)}
                      className="w-6 h-6 cursor-pointer text-[var(--color-gray-700)] hover:text-[var(--color-gray-500)]"
                    />
                    {showModal && (
                      <DeleteConfirmation
                        onConfirm={() => handleDelete(emp.employee_id)}
                        onCancel={() => setShowModal(false)}
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-30 text-[var(--color-gray-700)] text-2xl font-semibold"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
