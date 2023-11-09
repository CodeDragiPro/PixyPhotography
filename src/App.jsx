import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Navbar from "./components/NavBar";
import Sidebar from "./pages/admin/Sidebar";
import { toast, ToastContainer } from "react-toastify";
function App() {
  return (
    <div className=" font-Poppins">
      <BrowserRouter>
        <Navbar />
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
