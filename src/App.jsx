import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Navbar from "./components/NavBar";
import Sidebar from "./pages/admin/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className=" font-Poppins">
      <BrowserRouter>
        <Navbar />
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<NotFoundPage/>}/>
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
