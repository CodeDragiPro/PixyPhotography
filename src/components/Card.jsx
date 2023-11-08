import React from 'react';

const Card = ({ title, description, images, date }) => {
  return (
    <div className="bg-white p-2">
      <img src={images} alt={title} className="w-full h-52 object-cover object-center" />
      <h2 className="text-xl font-semibold mt-4 font-Indie text-center">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-gray-600 mt-2">{date}</p>
    </div>
  );
};

export default Card;
