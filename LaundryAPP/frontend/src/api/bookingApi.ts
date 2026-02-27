import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL;
});

export const getbookings = async () => {
    const response = await Api.get("/api/getbookings");
    return response.data;
};

export const createBooking = async () => {
    const response = await Api.post("/api/createBooking" , data);
    return response.data;
};