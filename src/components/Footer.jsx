import React from "react";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

import LogoCodeDragi from "../assets/logoCodeDragi.png";
import Pixy from "../assets/pixy.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold mb-2 text-pixypink">
            PixyPhotographie
          </h3>
          <p className="text-pixycyan">Arresto Momentum...</p>
        </div>
        <img
          src={Pixy}
          alt="PixyPhotographie Logo"
          className="w-12 h-12 object-cover rounded-full mb-4 md:mb-0 md:ml-4 mt-2"
        />
        <div className="md:ml-auto flex">
          <Link
            to="https://www.facebook.com/profile.php?id=100093113672233&locale=fr_FR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillFacebook size={24} className="mr-4 animate-bounce" />
          </Link>
          <Link
            to="https://www.instagram.com/pixiie_power/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram size={24} className="animate-bounce" />
          </Link>
        </div>
      </div>
      <div className="mt-8 text-center">
        <img
          src={LogoCodeDragi}
          className="w-[10rem] mx-auto"
          alt="CodeDragi Logo"
        />
        <p className="text-pixycyan">
          &copy; 2023 Codedragi. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
