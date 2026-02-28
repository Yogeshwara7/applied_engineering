import getBookings from "../api/bookingApi";
import { useState, useEffect } from "react";
import BookingForm from "../components/BookingForm";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
const fetchData=async () => {
        const data = await getBookings();
        setBookings(data);
        };
    useEffect(() => {
        fetchData();
    },[] );
    
    return (
        <>
        <BookingForm onBookingCreated={fetchData}/>
          {bookings.map((booking: any) => (
            <div key={booking.id}>
              <p>Name : {booking.customer_name}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))}
        </>
    );
}