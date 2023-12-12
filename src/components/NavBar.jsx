import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";
import logopixy from '../assets/logopixyfinal.png'

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();

  const pathsToRenderNavbar = ["/", "/portfolio", "#price", "#about", "#contact", "/login"];
  const shouldRenderNavbar = pathsToRenderNavbar.includes(location.pathname);

  if (!shouldRenderNavbar) {
    return null;
  }

  const handleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  const isLogin = location.pathname === "/login";

  return (
    <div className="flex justify-between items-center h-15 mx-auto px-4 text-white w-full z-30  bg-primary md:text-xl ">
      <div className="flex items-center">
        <a href="/" onClick={closeNav}>
          <img src={logopixy} className="md:w-[15vh] w-[10vh] p-2"/>
        </a>
      </div>
      <ul className="hidden md:flex">
        {isLogin ? (
          <li className="p-4 hover:text-secondary">
            <Link to="/" onClick={closeNav}>
              Accueil
            </Link>
          </li>
        ) : (
          <>
            <li className="p-4 hover:text-tertiary">
              <Link to="/" onClick={closeNav}>
                Accueil
              </Link>
            </li>
            <li className="p-4 hover:text-tertiary">
              <a href="/portfolio" onClick={closeNav}>
                Portfolio
              </a>
            </li>
            <li className="p-4 hover:text-tertiary">
              <a href="#price" onClick={closeNav}>
                Tarifs
              </a>
            </li>
            <li className="p-4 hover:text-tertiary">
              <a href="#about" onClick={closeNav}>
                A Propos
              </a>
            </li>
            <li className="p-4 hover:text-tertiary">
              <a href="#contact" onClick={closeNav}>
                Contact
              </a>
            </li>
            <li className="p-4 hover:text-tertiary">
              <a href="/login" onClick={closeNav}>
                login
              </a>
            </li>
          </>
        )}
      </ul>

      <div onClick={handleNav} className="block md:hidden py-2">
        {nav ? <AiOutlineClose size={25} className="text-white" /> : <CgMenuGridR size={25} className="text-white" />}
      </div>
      <ul
        className={
          nav
            ? "z-10 fixed uppercase left-0 top-0 w-[60%] h-full border-r border-r-white bg-primary ease-in-out duration-500 text-spectral-pink"
            : "ease-in-out duration-300 fixed left-[-100%]"
        }
      >
        {isLogin ? (
          <li className="p-4 border-b border-white text-spectralpink">
            <Link to="/" onClick={closeNav}>
              Accueil
            </Link>
          </li>
        ) : (
          <>
            <li className="p-4 border-b border-white text-white">
              <Link to="/" onClick={closeNav}>
                Accueil
              </Link>
            </li>
            <li className="p-4 border-b border-white text-white">
              <a href="/portfolio" onClick={closeNav}>
                Portfolio
              </a>
            </li>
            <li className="p-4 border-b border-white text-white">
              <a href="#price" onClick={closeNav}>
                Tarifs
              </a>
            </li>
            <li className="p-4 border-b border-white text-white">
              <a href="#about" onClick={closeNav}>
                A Propos
              </a>
            </li>
            <li className="p-4 border-b border-white text-white">
              <a href="#contact" onClick={closeNav}>
                Contact
              </a>
            </li>
            <li className="p-4 border-b border-white text-white">
              <a href="/login" onClick={closeNav}>
                login
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
