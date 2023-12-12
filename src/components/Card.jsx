import React, { useState, useEffect } from "react";
import Punaise from "../assets/punaise.png";

const Card = ({ title, description, images, date, tag, onClick }) => {
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
    transform: `rotate(${rotation}deg)`,
  };

  const pinStyle = {
    top: 0,
    left: `calc(50% + ${Math.random() * 10 - 5}px)`,
    transform: "translateX(-50%)",
  };

  const handleCardClick = () => {
    onClick(); // Notify the parent component that the card has been clicked
  };

  return (
    <div className="bg-white p-2 relative  shadow-lg  rounded" style={cardStyle} onClick={handleCardClick}>
      <img
        src={images}
        alt={title}
        className="w-full h-52 object-cover object-center cursor-pointer"
      />

      <img
        src={Punaise}
        alt="Punaise"
        className="absolute w-6 h-6"
        style={pinStyle}
      />

      <div className="flex flex-col mt-4">
        <h2 className="text-xl font-semibold font-Indie text-center text-primary">
          {title}
        </h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-gray-400 mt-2">
          {date ? new Date(date.seconds * 1000).toLocaleDateString() : ""}
        </p>

        <p className="text-gray-300 mt-2">
          #{tag && tag.length > 0 ? tag.join(" ") : ""}
        </p>
      </div>
    </div>
  );
};

export default Card;
