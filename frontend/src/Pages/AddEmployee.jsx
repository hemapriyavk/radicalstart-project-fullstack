import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import upload_area from "../assets/upload_area.png";
import { backendUrl } from "../App";
import axios from "axios";
import PageHeader from "../Components/PageHeader";

const AddEmployee = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
  });

  const navigate = useNavigate();

  // Handle input change for text fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Form submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (image) {
        data.append("image", image);
      }

      const response = await axios.post(backendUrl + "/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        navigate("/");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full pl-3">
      {/* Header */}
      <PageHeader title="Add Employee Details" />

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="bg-[var(--color-white)] py-6 w-full max-w-4xl"
      >
        {/* Image Upload */}
        <label htmlFor="image">
          <img
            className="w-20 my-4"
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="Upload Preview"
          />
          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
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
              placeholder: "Enter Employee ID",
            },
            {
              label: "Department*",
              name: "department",
              options: ["Design", "Development", "Marketing"],
            },
            {
              label: "Designation*",
              name: "designation",
              options: ["Trainee", "Junior", "Senior", "Team Lead"],
            },
            {
              label: "Project*",
              name: "project",
              type: "text",
              placeholder: "Enter Project",
            },
            { label: "Type*", name: "type", options: ["Office", "Home"] },
            {
              label: "Status*",
              name: "status",
              options: ["Temporary", "Permanent"],
            },
          ].map((field) => (
            <div key={field.name} className="my-3">
              <label className="text-[var(--color-gray-800)] mb-3 font-bold text-lg">
                {field.label}
              </label>
              <br />
              <br />
              {field.options ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-[80%] px-4 py-2 border-[var(--color-gray-500)] shadow-lg rounded-2xl"
                >
                  <option value="">Select {field.label.split("*")[0]}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
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
            type="button"
            className="w-28 py-3 mt-4 text-lg font-semibold border-[var(--color-gray-300)] rounded-lg cursor-pointer"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-28 py-3 mt-4 bg-[var(--color-blue-500)] text-[var(--color-white)] text-lg font-semibold rounded-lg cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
