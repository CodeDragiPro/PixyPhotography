import React from 'react';
import Pixy from '../assets/pixy.jpg';
import TitleSection from './ui/TitleSection';

const About = () => {
  return (
    <div className="" id='about'>
        
      <div className="w-full mx-auto text-center ">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-1/3 mb-4">
            <img src={Pixy} alt="Photographe" className="rounded-full w-48 h-48 object-cover mx-auto mb-4 border-4 border-secondary" />
          </div>
          <div className="md:w-2/3 md:ml-8 italic text-tertiary p-4">
            <p className="text-lg mb-4">
              "Bienvenue sur PixiiePhotography, Je m’appelle Blanche et je pratique la photographie depuis quelques temps … J’ai obtenu mon diplôme de photographie en 2022. Souhaitant me lancer dans la photographie professionnelle pendant mon temps libre, je suis à l’écoute d’opportunités, ayant pour objectif d’acquérir plus d’expérience dans ce domaine."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
