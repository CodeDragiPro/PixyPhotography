// DashboardRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/admin/Dasboard';
import NewPortfolio from './pages/admin/NewPortfolio';
import ListPortfolio from './pages/admin/ListPortfolio';



const DashboardRoutes = () => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
   
    <Routes>
        
     
       
        
      <Route path="/" element={<Dashboard />} />
      <Route path="/new" element={<NewPortfolio />} />
      <Route path="/list" element={<ListPortfolio />} />
    </Routes>
 
  );
};

export default DashboardRoutes;
