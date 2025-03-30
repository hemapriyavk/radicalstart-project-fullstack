import express from 'express';
import { addEmployee, allEmployees, deleteEmployee, editEmployee, viewEmployee } from '../controllers/controller.js';
import upload from '../middleware/multer.js';

const employeeRouter = express.Router();

employeeRouter.post("/add", upload.single("image"), addEmployee);
employeeRouter.get("/all-employees", allEmployees);
employeeRouter.get("/view/:employeeId", viewEmployee);
employeeRouter.put("/edit/:employeeId",upload.single("image"),  editEmployee);
employeeRouter.delete("/delete/:employeeId", deleteEmployee);

export default employeeRouter;