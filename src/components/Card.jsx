import React, { useState, useEffect } from 'react';
import Punaise from '../assets/punaise.png';


const Card = ({ title, description, images, date }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = images;
    imageLoader.onload = () => {
      setLoading(false);
    };
  }, [images]);

  const rotation = Math.random() * 10 - 5;

  const cardStyle = {
    transform: `rotate(${rotation}deg)`
  };

  const pinStyle = {
    top: 0,
    left: `calc(50% + ${Math.random() * 10 - 5}px)`,
    transform: 'translateX(-50%)'
  };

  return (
    <div className="bg-white p-2 relative" style={cardStyle}>
      {/* Image de la carte */}
      <img src={images} alt={title} className="w-full h-52 object-cover object-center" />

      {/* Image de la punaise centrée horizontalement en haut de la carte avec variation aléatoire */}
      <img src={Punaise} alt="Punaise" className="absolute w-6 h-6" style={pinStyle} />

      {/* Contenu textuel de la carte */}
      <div className="flex flex-col mt-4">
        <h2 className="text-xl font-semibold font-Indie text-center">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      {/* Date de la carte */}
      <p className="text-gray-600 mt-2">{date}</p>
    </div>
  );
};

export default Card;
