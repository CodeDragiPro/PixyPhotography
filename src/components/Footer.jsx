import React from "react";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import logopixy from "../assets/logopixyfinal.png";
import LogoCodeDragi from "../assets/logoCodeDragi.png";
import Pixy from "../assets/pixy.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" text-white py-8 bg-primary">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start">
          <img src={logopixy} className="w-[12vh] p-2" />
        </div>
        <img
          src={Pixy}
          alt="PixyPhotographie Logo"
          className="w-12 h-12 object-cover rounded-full mb-4 md:mb-0 md:ml-4 mt-2 border-2 border-secondary"
        />
        <div className="md:ml-auto flex p-2">
          <Link
            to="https://www.facebook.com/profile.php?id=100093113672233&locale=fr_FR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillFacebook
              size={24}
              className="mr-4 animate-bounce text-white"
            />
          </Link>
          <Link
            to="https://www.instagram.com/pixiie_power/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram size={24} className="animate-bounce text-white" />
          </Link>
        </div>
      </div>
      <div className="mt-8 text-center">
        <a
          href={`https://www.codedragi.fr/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={LogoCodeDragi}
            className="w-[10rem] mx-auto"
            alt="CodeDragi Logo"
          />
        </a>

        <p className="">&copy; 2023 Codedragi. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
