import React from "react";

import Sidebar from "./Components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Employees from "./Pages/Employees";
import AddEmployee from "./Pages/AddEmployee";
import EditEmployee from "./Pages/EditEmployee";
import ViewEmployee from "./Pages/ViewEmployee";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import Calender from "./Pages/Calender";
import Messages from "./Pages/Messages";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
      <Header />
      <div className="flex-grow p-6 bg-gray-50">
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/employee/edit/:employeeId" element={<EditEmployee />} />
        <Route path="/employee/view/:employeeId" element={<ViewEmployee />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
      </div>
      </div>
    </div>
  );
};

export default App;
