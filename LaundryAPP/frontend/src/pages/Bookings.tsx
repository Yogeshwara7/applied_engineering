import { getBookings , cancelbookings } from "../api/bookingApi";
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

    const handleCancel = async (id: number) => {
      try{
        await cancelbookings(id);
        alert("Booking Canceled");
        await fetchData();
      }
      catch(error){
        console.log(error);
      }
      
    }
    
    return (
        <>
        <BookingForm onBookingCreated={fetchData}/>
          {bookings.map((booking: any) => (
            <div key={booking.id}>
              <p>Name : {booking.customer_name}</p>
              <p>Status: {booking.status}</p>
          <button onClick={() => handleCancel(booking.id)}>
          Cancel
          </button>
          </div>
          ))}
        </>
    );
}