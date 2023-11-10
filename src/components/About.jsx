import React from 'react';
import Pixy from '../assets/pixy.jpg';
import TitleSection from './ui/TitleSection';

const About = () => {
  return (
    <div className="py-16" id='about'>
        <TitleSection paragraphe="A" title=" propos" paragrapheColor="text-pixypink"/>
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-1/3 mb-4">
            <img src={Pixy} alt="Photographe" className="rounded-full w-48 h-48 object-cover mx-auto mb-4 border-4 border-pixycyan" />
          </div>
          <div className="md:w-2/3 md:ml-8 italic text-pixygreen p-4">
            <p className="text-lg mb-4">
              "Bienvenue sur PixyPhotographie ! Nous sommes passionnés par la capture des moments spéciaux de votre vie."
            </p>
            <p className="text-lg">
              "Notre photographe professionnel met tout en œuvre pour capturer l'essence de chaque instant, que ce soit lors d'un mariage, d'un événement spécial, en studio, ou au cœur de la nature."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
