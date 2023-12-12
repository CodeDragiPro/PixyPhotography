// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Navbar from "./components/NavBar";
import Sidebar from "./pages/admin/Sidebar";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardRoutes from "./DashboardRoute";

function App() {
  return (
    <div className="font-Poppins">
      <BrowserRouter>
        <Navbar />
        <div className="flex">
          <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/dashboard/*" element={<DashboardRoutes />} />
            </Routes>
        </div>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
