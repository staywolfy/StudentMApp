import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2";

// Create connection pool
const pool = mysql.createPool({
  connectionLimit: 300,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL pool connection error:", err.code, err.message);

    // Provide troubleshooting tips
    if (err.code === "ECONNREFUSED") {
      console.log("\n💡 ECONNREFUSED Troubleshooting:");
      console.log("1. Check if MySQL service is running");
      console.log("2. Verify MySQL credentials in .env file");
      console.log("3. Ensure database exists");
      console.log("4. Check if MySQL is on different port");
    }
  } else {
    console.log("✅ MySQL pool connected successfully");
    connection.release();
  }
});

// Export the promise-based pool
export const db = pool.promise();
