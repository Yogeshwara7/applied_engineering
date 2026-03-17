import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getBookings = async () => {
    const response = await Api.get(`/api/booking`);
    return response.data;
};

export const createBooking = async (data: any) => {
const response = await Api.post(`/api/booking`, data);
return response.data;
};

export const cancelbookings = async(id: number)=>{
    const response = await Api.put(`api/booking/cancel/${id}`);
    return response.data;
}