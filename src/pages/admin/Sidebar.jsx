import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import NewPortfolio from './NewPortfolio';
import Dashboard from './Dasboard';
import { MdDashboard, MdHome, MdAddAPhoto, MdFormatAlignJustify, MdLogout } from 'react-icons/md';
import ListPortfolio from './ListPortfolio';
import arrow from '../../assets/control.png';
import Logo from '../../assets/logo.png';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pathsToRenderSidebar = ["/dashboard", "/dashboard/new", "/dashboard/list"];

  const shouldRenderSidebar = pathsToRenderSidebar.includes(location.pathname);

  if (!shouldRenderSidebar) {
    return null;
  }
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  

  const Menus = [
    { title: "Acceuil", icon: <MdHome size={25} className='text-pixcyan hover:text-pixypink' />, to:"/" },
    { title: "Dashboard", icon: <MdDashboard size={25} className='text-pixcyan hover:text-pixypink'/>, to:"/dashboard" , gap: true  },
    { title: "Nouveau", icon: <MdAddAPhoto size={25} className='text-pixcyan hover:text-pixypink'/>, to:"/dashboard/new" },
    { title: "Liste", icon: <MdFormatAlignJustify size={25} className='text-pixcyan hover:text-pixypink'/>, to:"/dashboard/list" },
    { title: "Déconnexion", icon: <MdLogout size={25} className='text-pixcyan hover:text-pixypink'/>, gap: true, onClick: handleLogout }
  ];

  
  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-pixygreen h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={arrow}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-pixygreen
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left  text-xl duration-200 font-bold ${
              !open && "scale-0"
            }`}
          >
            Pixy Photography
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link
              to={Menu.to}
              onClick={Menu.onClick}
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-6" : "mt-2"} ${
              index === 0 && "bg-light-white"
              } `}
            >
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200 hover:text-pixypink`}>
                {Menu.title}
              </span>
            </Link>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/new" element={<NewPortfolio />} />
          <Route path="/dashboard/list" element={<ListPortfolio />} />
        </Routes>
      </div>
    </div>
  );
};

export default Sidebar;
