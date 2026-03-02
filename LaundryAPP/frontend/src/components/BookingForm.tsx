import { useState } from 'react';
import { createBooking } from '../api/bookingApi';

export default function BookingForm({ onBookingCreated }: { onBookingCreated: () => void }) {

  const [formData, setFormData] = useState({
  customer_name: '',
  phone: '',
  address: '',
  service_type: '',
  pickup_date: ''
});


  const handleChange = (event:any) => {
  const name = event.target.name;  
  const value = event.target.value;  
  
  setFormData({
    ...formData,     
    [name]: value    
  });
}

  

  const handleSubmit = async (event:any) => {
  event.preventDefault();
  try{
    await createBooking(formData);
      onBookingCreated();

    setFormData({
        customer_name:'',
        phone: '',
        address: '',
        service_type:'',
        pickup_date:''
    });

    alert('Booking created successfully');
  }
  catch(error){
    alert('Error creating booking')
  }
}
  return (
    <form onSubmit={handleSubmit}>
      
  <input
  type="text"
  name="customer_name"
  value={formData.customer_name}
  onChange={handleChange}
  placeholder="Customer Name"
/>
<input
  type="text"
  name="address"
  value={formData.address}
  onChange={handleChange}
  placeholder="Address"
/>
<input
  type="int"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="Phone number"
/>
<input
  type="text"
  name="service_type"
  value={formData.service_type}
  onChange={handleChange}
  placeholder="service_type"
/>
<input
  type="date"
  name="pickup_date"
  value={formData.pickup_date}
  onChange={handleChange}
  placeholder="Pickup date"
/>
    <button type='submit'>Create Booking</button>

    </form>
  );
}
