import React from 'react';

const TitleSection = ({ title }) => {
  return (
    <div className="flex items-center py-4">
    <div className="bg-gradient-to-r from-primary via-secondary to-tertiary h-2 flex-grow"></div>
    <span className="mx-4 text-secondary md:text-4xl text-2xl">
      {title}
    </span>
    <div className="bg-gradient-to-r from-primary via-secondary to-tertiary h-2 flex-grow rotate-180"></div>
  </div>
  );
}

export default TitleSection;
