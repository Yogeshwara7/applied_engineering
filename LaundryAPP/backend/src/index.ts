import express from "express";
import initDB from "./db/init";

const app = express();
app.use(express.json());

async function server() {
    await initDB();

    app.listen(3000, DB =>{
        console.log("server started on 3000");
    })
}

server();