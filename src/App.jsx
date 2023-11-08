import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dasboard";
// import NewPortfolio from "./pages/admin/NewPortfolio";
import Navbar from "./components/NavBar";
import Sidebar from "./pages/admin/Sidebar";

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
      </BrowserRouter>
    </div>
  );
}

export default App;
