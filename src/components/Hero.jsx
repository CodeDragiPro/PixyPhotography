import React from 'react';
import photo from '../assets/photo.jpg';

const Hero = () => {
  return (
    <div className="bg-cover bg-center h-[50vh] flex items-center justify-center" style={{ backgroundImage: `url(${photo})` }}>
      <div className="text-white text-center">
        <h1 className="md:text-6xl text-3xl font-bold uppercase text-pixypink">Arresto Momentum...</h1>
        <p className="mt-4 text-xl text-pixycyan">Bienvenue sur PixyPhotographie</p>
      </div>
    </div>
  );
};

export default Hero;
