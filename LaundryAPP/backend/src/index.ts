import express from "express";
import initDB from "./db/init";
import bookingRoute from "./routes/bookingRoutes";

const app = express();
app.use(express.json());


async function server() {
    await initDB();

    app.use("/api/booking", bookingRoute);
    app.listen(3000, () =>{
        console.log("server started on 3000");
    })
}

server();