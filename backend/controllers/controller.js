import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import db from "../config/connectDB.js";

// Add Employee
const addEmployee = async (req, res) => {
  try {
    const { name, employee_id, department, designation, project, type, status} = req.body;

    //Check all required input field is filled
    if (!name || !employee_id || !department || !designation || !project || !type || !status) {
      return res.json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Check if employee_id already exists
    const checkQuery = `SELECT * FROM employee_details WHERE employee_id = ?`;
    db.query(checkQuery, [employee_id], async (err, results) => {
      if (err) {
        console.log("Error checking employee_id:", err);
        return res.json({ success: false, message: "Database Error" });
      }

      if (results.length > 0) {
        return res.json({
          success: false,
          message: "Employee detail is already there",
        });
      }
  })

  //covert image file into url
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    //add details to database
    const query = `
      INSERT INTO employee_details (name, employee_id, department, designation, project, type, status, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      query,
      [
        name, employee_id, department, designation, project, type, status, imageUrl,
      ],
      (err, result) => {
        if (err) {
            console.log("Error inserting data:", err);
          return res.json({ success: false, message: "Database Error" });
          
        }
        res.json({ success: true, message: "Employee added" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};


//all Employees details
const allEmployees = async (req,res) => {
  try {
    // Fetch all employees
    const sql = "SELECT * FROM employee_details"; 

    const [results] = await db.promise().query(sql);
      res.json({ success: true, employees: results });
  } catch (error) {
    console.log("Unexpected error:", error);
    res.json({ success: false, message: "Internal Server Error" });
  }
}


// view employee details
const viewEmployee = async (req,res) => {
  try{
    // Extract employeeId from URL
    const { employeeId } = req.params;
    const sql = "SELECT * FROM employee_details WHERE employee_id = ?"; 

    const [results] = await db.promise().query(sql, [employeeId]);

    if (results.length === 0) {
      return res.json({ success: false, message: "Employee not found" });
    }

    res.json({ success: true, employee: results[0] });
  } catch (error) {
    console.log("Error fetching employee:", error);
    res.json({ success: false, message: "Internal Server Error" });
  }
}


//edit employee detail
const editEmployee = async (req,res) => {
  try {
    const { employeeId } = req.params;
    const { name, department, designation, project, type, status } = req.body;

    // Fetch existing employee details to retain old image if no new image is provided
    const [existingEmployee] = await db.promise().query(
      "SELECT image FROM employee_details WHERE employee_id = ?",
      [employeeId]
    );

    if (!existingEmployee.length) {
      return res.json({ success: false, message: "Employee not found" });
    }

    let imageUrl = existingEmployee[0].image; // Retain existing image

    // If a new image is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url; // New image URL from Cloudinary

      fs.unlinkSync(req.file.path); // Remove local uploaded file
    }

    // Update employee details in database
    const sql = `
      UPDATE employee_details 
      SET name = ?, department = ?, designation = ?, project = ?, type = ?, status = ?, image = ? 
      WHERE employee_id = ?
    `;

    const [result] = await db.promise().query(sql, [
      name, department, designation, project, type, status, imageUrl, employeeId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Employee not updated" });
    }

    res.status(200).json({ success: true, message: "Employee updated successfully", imageUrl });


  } catch (error) {
    console.log("Error fetching employee:", error);
    res.json({ success: false, message: "Internal Server Error" });
  }
}


//delete employee detail
const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Check if employee exists
    const [existingEmployee] = await db.promise().query(
      "SELECT image FROM employee_details WHERE employee_id = ?",
      [employeeId]
    );

    if (existingEmployee.length === 0) {
      return res.json({ success: false, message: "Employee not found" });
    }

    // If employee has an image, delete it from Cloudinary
    if (existingEmployee[0].image) {
      const imageUrl = existingEmployee[0].image;
      const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract public ID
      await cloudinary.uploader.destroy(publicId);
    }

    // Delete employee from the database
    const [result] = await db.promise().query(
      "DELETE FROM employee_details WHERE employee_id = ?",
      [employeeId]
    );

    if (result.affectedRows === 0) {
      return res.json({ success: false, message: "Employee could not be deleted" });
    }

    res.json({ success: true, message: "Employee deleted successfully" });

  } catch (error) {
    console.error("Error deleting employee:", error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};


export { addEmployee, allEmployees, viewEmployee, editEmployee, deleteEmployee };
