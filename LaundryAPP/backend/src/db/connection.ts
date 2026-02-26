import mysql from "mysql2/promise";

const pool = mysql.createPool ({
    user : "root",
    password : "secret",
    host : "localhost",
    database: "laundry",
    port:3307,
    waitForConnection:true,
    connectionLimit:10,
});

export default pool;
