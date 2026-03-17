import type { Request, Response } from "express";
import pool from "../db/connection";

export const createBooking = async (req:Request , res: Response) =>{
    try{

        const{
            customer_name,
            phone,
            service_type,
            address,
            pickup_date
        } = req.body;


        if(!customer_name || !phone || !service_type || !address || !pickup_date){
            return res.status(400).json({
                message: "All fields required"
            });
        }

        const [result] :any = await pool.execute(
            `INSERT INTO bookings
            (customer_name, phone, service_type,address,pickup_date)
            VALUES(?,?,?,?,?)`
            , [customer_name , phone, service_type,address,pickup_date ]
        )


        return res.status(201).json({
            message: "Booking created",
            id: (result as any).insertId || (result as any).Id
        });

    }
    catch(error){
        return res.status(400).json({
            message: "booking not created"
        })
    }
}

export const getbookings= async (req:Request , res:Response)=>{
    try{

        const [rows] = await pool.execute(
            `SELECT * FROM bookings WHERE status = "pending" ORDER BY created_at DESC `
        );
       res.status(200).json(rows)
    }
    catch(error){
        res.status(500).json({error:"Internal error occured"});
    }
}

export const cancelbookings=async (req:Request , res:Response)=>{
    try{
        const bookingId = req.params.id;
        if(!bookingId){
            return res.status(404).json({message:"Not Found"});
        }

        await pool.execute(
            "UPDATE bookings SET status = 'Cancelled' WHERE id = ?",
            [bookingId]
        );

        res.status(200).json({message:"Booking Canceled"});
    }
    catch(error){
        res.status(500).json({error:"error.message"});
    }
}