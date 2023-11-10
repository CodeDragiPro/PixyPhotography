import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";

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
    <div className="flex justify-between items-center h-15 mx-auto px-4 text-pixygreen w-full z-30 fixed bg-pixybeige text-xl ">
      <div className="flex items-center">
        <a href="/" onClick={closeNav}>
          <p className="font-bold text-pixygreen">Pixy Photography</p>
        </a>
      </div>
      <ul className="hidden md:flex">
        {isLogin ? (
          <li className="p-4 hover:text-pixycyan">
            <Link to="/" onClick={closeNav}>
              Accueil
            </Link>
          </li>
        ) : (
          <>
            <li className="p-4 hover:text-pixycyan">
              <Link to="/" onClick={closeNav}>
                Accueil
              </Link>
            </li>
            <li className="p-4 hover:text-pixycyan">
              <a href="/portfolio" onClick={closeNav}>
                Portfolio
              </a>
            </li>
            <li className="p-4 hover:text-pixycyan">
              <a href="#price" onClick={closeNav}>
                Tarifs
              </a>
            </li>
            <li className="p-4 hover:text-pixycyan">
              <a href="#about" onClick={closeNav}>
                A Propos
              </a>
            </li>
            <li className="p-4 hover:text-pixycyan">
              <a href="#contact" onClick={closeNav}>
                Contact
              </a>
            </li>
            <li className="p-4 hover:text-pixycyan">
              <a href="/login" onClick={closeNav}>
                login
              </a>
            </li>
          </>
        )}
      </ul>

      <div onClick={handleNav} className="block md:hidden mt-2">
        {nav ? <AiOutlineClose size={25} className="text-pixygreen" /> : <CgMenuGridR size={25} className="text-pixygreen" />}
      </div>
      <ul
        className={
          nav
            ? "z-10 fixed uppercase left-0 top-0 w-[60%] h-full border-r border-r-pixybeige bg-pixygreen ease-in-out duration-500 text-pixypink"
            : "ease-in-out duration-300 fixed left-[-100%]"
        }
      >
        {isLogin ? (
          <li className="p-4 border-b border-pixybeige hover:text-pixycyan">
            <Link to="/" onClick={closeNav}>
              Accueil
            </Link>
          </li>
        ) : (
          <>
            <li className="p-4 border-b border-pixybeige hover:text-pixycyan">
              <Link to="/" onClick={closeNav}>
                Accueil
              </Link>
            </li>
            <li className="p-4 border-b border-pixybeige hover:text-pixycyan">
              <a href="/portfolio" onClick={closeNav}>
                Portfolio
              </a>
            </li>
            <li className="p-4 border-b border-pixybeige hover:text-pixycyan">
              <a href="#price" onClick={closeNav}>
                Tarifs
              </a>
            </li>
            <li className="p-4 border-b border-pixybeige hover:text-pixycyan">
              <a href="#about" onClick={closeNav}>
                A Propos
              </a>
            </li>
            <li className="p-4 border-b border-pixybeige hover:text-pixycyan">
              <a href="#contact" onClick={closeNav}>
                Contact
              </a>
            </li>
            <li className="p-4 border-b border-pixybeige hover:text-pixycyan">
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
