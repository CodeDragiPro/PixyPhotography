import React from 'react';
import { FaTimes } from "react-icons/fa";
const ModalComponent = ({ images, title,description, type, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black  p-4">
       <FaTimes
              onClick={onClose}
              className="text-white absolute top-2 right-2"
              size={20}
            />
      <div className="flex flex-col items-center justify-center p-8  mx-auto overflow-hidden rounded shadow-lg">
        <img src={images} alt={title} className="md:w-1/2 h-full object-cover mb-4 rounded" />
        <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
        <h3 className="text-medium font-semibold mb-2 text-white italic">" {description} "</h3>
        <p className="text-gray-700">{type}</p>
      </div>
    </div>
  );
};

export default ModalComponent;
