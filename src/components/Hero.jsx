import React from 'react';
import photo from '../assets/photo.jpg';
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai';

const Hero = () => {
  return (
    <div className="bg-cover bg-center h-[50vh] flex items-center justify-center backdrop-blur-sm bg-black/30" style={{ backgroundImage: `url(${photo})` }}>
      <div className="text-white text-center">
        <h1 className="md:text-6xl text-3xl font-bold uppercase text-pixypink">Arresto Momentum...</h1>
        <p className="mt-4 text-xl text-pixycyan">Bienvenue sur PixyPhotographie</p>

        <div className="flex justify-center mt-4 space-x-4">
          <AiFillFacebook size={25}  className='animate-bounce 5s'/>
          <AiFillInstagram size={25} className='animate-bounce 5s'/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
