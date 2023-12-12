import React from 'react';
import PropTypes from 'prop-types';

const PriceCard = ({ title, image, description, listItems, price }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg  m-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4 text-primary">{title}</h2>
        <img src={image} alt={title} className="w-full h-50 object-cover mb-4" />
        <p className="text-secondary italic">{description}</p>
      </div>
      <hr className="my-2 border-t border-gray-300" />
      <ul className="text-tertiary">
        {listItems.map((item, index) => (
          <li key={index} className="mb-2">
            {item}
          </li>
        ))}
      </ul>
      <hr className="my-2 border-t border-gray-300" />
      <p className="text-secondary font-bold">À partir de {price}</p>
    </div>
  );
};

PriceCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.string.isRequired,
};

export default PriceCard;
