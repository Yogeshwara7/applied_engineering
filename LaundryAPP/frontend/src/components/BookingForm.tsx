import { useState } from 'react';
import { createBooking } from '../api/bookingApi';

export default function BookingForm({ onBookingCreated }: { onBookingCreated: () => void }) {
  // TODO: Create state for form data
  const [formData, setFormData] = useState({
  customer_name: '',
  phone: '',
  address: '',
  service_type: '',
  pickup_date: ''
});

  // What fields do you need based on the backend controller?

  
  // TODO: Create a handleChange function
  const handleChange = (event:any) => {
  const name = event.target.name;    // Which input? (e.g., "phone")
  const value = event.target.value;  // What did they type? (e.g., "123")
  
  setFormData({
    ...formData,     // Keep all existing fields
    [name]: value    // Update only the one that changed
  });
}

  

  const handleSubmit = async (event:any) => {
  // Step 1: Prevent page reload
  event.preventDefault();
  // Hint: event.preventDefault()
  
  // Step 2: Try to create booking
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
  // Hint: use try/catch
  // Hint: await createBooking(formData)
  
  // Step 3: If success, clear the form
  // Hint: setFormData back to empty strings
  
  // Step 4: If error, show message
  // Hint: console.log or alert
}

  // How do you update state when user types?
  
  // TODO: Create a handleSubmit function
  // What should happen when form is submitted?
  
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
