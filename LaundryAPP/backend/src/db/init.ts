import db from "./connection";

async function initDB() {

    try{
        await db.query(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            customer_name VARCHAR(100) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            service_type VARCHAR(50) NOT NULL,
            status ENUM('pending', 'accepted', 'completed', 'cancelled') 
            NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `)
    }
    catch(error){
        console.error("DB Initialization failed:", error);
        process.exit(1);
    }
}

export default initDB;