/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import upload_area from "../assets/upload_area.png";
import axios from "axios";
import { backendUrl } from "../App";
import PageHeader from "../Components/PageHeader";

const EditEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    image: "",
  });

  //fetch employee details
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`${backendUrl}/view/${employeeId}`);
      if (response.data.success) {
        setEmployee(response.data.employee);
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  //handle input change
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  //handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", employee.name);
      formData.append("department", employee.department);
      formData.append("designation", employee.designation);
      formData.append("project", employee.project);
      formData.append("type", employee.type);
      formData.append("status", employee.status);
      if (image) {
        formData.append("image", image);
      }

      // Send update request
      const response = await axios.put(
        `${backendUrl}/edit/${employeeId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        navigate("/");
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [employeeId]);

  return (
    <div className="w-full pl-3">
      {/* Header */}
      <PageHeader title="Edit Employee Details" />

      {/* form  */}
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--color-white)] py-6 w-full max-w-4xl"
      >
        {/* image section */}
        <label htmlFor="image">
          <img
            className="w-20 my-4"
            src={
              image ? URL.createObjectURL(image) : employee.image || upload_area
            }
            alt="employee"
          />
          <input
            name="image"
            onChange={handleImageChange}
            type="file"
            id="image"
            hidden
          />
        </label>

        {/* Form fields */}
        <div className=" grid grid-cols-2 gap-4">
          {[
            {
              label: "Name*",
              name: "name",
              type: "text",
              placeholder: "Enter name",
            },
            {
              label: "Employee ID*",
              name: "employee_id",
              type: "number",
              readOnly: true,
            },
            {
              label: "Department*",
              name: "department",
              type: "select",
              options: ["", "Design", "Development", "Marketing"],
            },
            {
              label: "Designation*",
              name: "designation",
              type: "select",
              options: ["", "Trainee", "Junior", "Senior", "Team Lead"],
            },
            {
              label: "Project*",
              name: "project",
              type: "text",
              placeholder: "Enter project",
            },
            {
              label: "Type*",
              name: "type",
              type: "select",
              options: ["", "Office", "Home"],
            },
            {
              label: "Status*",
              name: "status",
              type: "select",
              options: ["", "Temporary", "Permanent"],
            },
          ].map((field) => (
            <div key={field.name} className="my-3">
              <label className="text-[var(--color-gray-800)] mb-2 font-bold text-lg">
                {field.label}
              </label>
              <br />
              <br />
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={employee[field.name]}
                  onChange={handleChange}
                  className="w-[80%] px-4 py-2 border-[var(--color-gray-500)] shadow-lg rounded-2xl"
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option || `Select ${field.label.split("*")[0]}`}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={employee[field.name]}
                  onChange={handleChange}
                  required
                  readOnly={field.readOnly}
                  placeholder={field.placeholder}
                  className="w-[80%] px-4 py-2 border-[var(--color-gray-500)] shadow-lg rounded-2xl"
                />
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-end gap-4">
          <button
            className="w-28 py-3 mt-4 text-lg font-semibold border-[var(--color-gray-300)] rounded-lg cursor-pointer"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

          <button
            className="w-28 py-3 mt-4 bg-[var(--color-blue-500)] text-[var(--color-white)] text-lg font-semibold rounded-lg cursor-pointer"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
