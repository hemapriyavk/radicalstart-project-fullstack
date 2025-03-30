import mysql from 'mysql2';

const db = mysql.createConnection({

  /* XAMPP */
    // host: "localhost",
    // user: "root", // Default MySQL username in XAMPP
    // password: "", // Default is empty in XAMPP
    // database: "employees",

    host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
  });
  
 db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
    } else {
      console.log("Connected to MySQL Database ✅");
    }
  });

  export default db;