import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookings from "./pages/Bookings";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Bookings />} />
  </Routes>
</BrowserRouter>
)