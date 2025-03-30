/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import PageHeader from "../Components/PageHeader";
import DetailItem from "../Components/DetailItem";

const ViewEmployee = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetch employee details
  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/view/${employeeId}`);
      if (response.data.success) {
        setEmployee(response.data.employee);
      } else {
        setError("Employee not found.");
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
      setError("Error fetching employee details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [employeeId]);

  if (loading)
    return <p className="text-lg text-[var(--color-gray-700)]">Loading...</p>;
  if (error)
    return <p className="text-lg text-[var(--color-red-500)]">{error}</p>;
  if (!employee)
    return (
      <p className="text-lg text-[var(--color-red-500)]">Employee not found</p>
    );

  return (
    <div className="w-full pl-3">
      {/* Header */}
      <PageHeader title="View Employee Details" />

      {/* Employee Info */}
      <div className="bg-[var(--color-white)] py-6 w-full max-w-4xl">
        <img
          src={employee.image}
          alt={employee.name}
          className="w-24 h-28 rounded-lg object-cover mb-2"
        />
        <div className="border-b border-[var(--color-gray-300)] grid grid-cols-2">
          <DetailItem label="Name" value={employee.name} />
          <DetailItem label="Employee ID" value={employee.employee_id} />
        </div>
        <div className="border-b border-[var(--color-gray-300)] grid grid-cols-2">
          <DetailItem label="Department" value={employee.department} />
          <DetailItem label="Designation" value={employee.designation} />
        </div>
        <div className="border-b border-[var(--color-gray-300)] grid grid-cols-2">
          <DetailItem label="Project" value={employee.project} />
          <DetailItem label="Type" value={employee.type} />
        </div>
        <div className="border-b border-[var(--color-gray-300)] grid grid-cols-2">
          <DetailItem label="Status" value={employee.status} />
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
