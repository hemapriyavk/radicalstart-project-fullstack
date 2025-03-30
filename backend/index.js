import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import employeeRouter from './routes/route.js';
import connectCloudinary from './config/cloudinary.js';
import db from './config/connectDB.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());
db;
connectCloudinary();


//Routes
app.use('/', employeeRouter);

app.get('/',(req,res)=>{
    res.send("API Working")
});

app.listen(port, ()=>console.log('server started on port: '+ port));