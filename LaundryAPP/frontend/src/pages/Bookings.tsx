import getBookings from "..api/getBookings";
import {useState, useEffect} from "react";

export default function Bookings() {
    const[bookings, setbookings]= useState([]);

    useEffect(() => {
      const fetchData=async () => {
        const data=await getBookings();
        setbookings(data);
        };
        fetchData();
    },[] );
    
    return(
        
    )
}