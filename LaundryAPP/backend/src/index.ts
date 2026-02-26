import express from "express";
import initDB from "./db/init";
import bookingRoute from "../controllers/bookingController";

const app = express();
app.use(express.json());


async function server() {
    await initDB();

    app.use("/api/booking", bookingRoute);
    app.listen(3000, DB =>{
        console.log("server started on 3000");
    })
}

server();