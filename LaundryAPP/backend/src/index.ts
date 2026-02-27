import express from "express";
import initDB from "./db/init";
import bookingRoute from "./routes/bookingRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


async function server() {
    await initDB();

    app.use("/api/booking", bookingRoute);

    app.listen(3000, () =>{
        console.log("server started on 3000");
    })
}
server();