import React from 'react';

const TitleSection = ({ paragraphe, title, paragrapheColor }) => {
  return (
    <div className='px-4'>
      <h1 className="md:text-4xl text-2xl text-pixygreen">
        <span className={`${paragrapheColor} text-5xl opacity-50`}>{paragraphe}</span>
        {title}
      </h1>
    </div>
  );
}

export default TitleSection;
