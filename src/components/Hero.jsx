import React from "react";
import photo from "../assets/photo.jpg";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center h-[50vh] flex items-center justify-center backdrop-blur-sm bg-black/30"
      style={{ backgroundImage: `url(${photo})` }}
    >
      <div className="text-white text-center">
        <h1 className="md:text-6xl text-3xl font-bold uppercase text-pixypink">
          Arresto Momentum...
        </h1>
        <p className="mt-4 text-xl text-pixycyan">
          Bienvenue sur PixyPhotographie
        </p>

        <div className="flex justify-center mt-4 space-x-4">
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
    </div>
  );
};

export default Hero;
