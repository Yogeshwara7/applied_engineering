import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getBookings = async () => {
    const response = await Api.get("/api/booking");
    return response.data;
};

// also provide a default export for convenience
export default getBookings;

export const createBooking = async (data: any) => {
    const response = await Api.post("/api/booking", data);
    return response.data;
};