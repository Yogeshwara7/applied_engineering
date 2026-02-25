import db from "./connection";

async function initDB() {

    try{
        await db.query(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            customer_name VARCHAR(100) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            service_type VARCHAR(50) NOT NULL,
            address VARCHAR(200) NOT NULL,
            pickup_date DATETIME NOT NULL,
            kg DECIMAL(5,2) NULL,
            price DECIMAL(10,2) NULL,
            status ENUM('Pending', 'Accepted', 'Completed', 'Rejected') 
            NOT NULL DEFAULT 'Pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            ON UPDATE CURRENT_TIMESTAMP
            )
        `)
    }
    catch(error){
        console.error("DB Initialization failed:", error);
        process.exit(1);
    }
}

export default initDB;