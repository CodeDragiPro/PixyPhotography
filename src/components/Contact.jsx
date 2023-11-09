import React, { useState } from 'react';
import TitleSection from './ui/TitleSection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez votre logique pour traiter le formulaire ici

    // Réinitialise le formulaire après la soumission
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return ( 
    <div className="bg-pixypink py-16" id='contact'>
    <TitleSection paragraphe="C" title="ontact" paragrapheColor="text-pixybeige"/>
    <div className='p-4'>
      <div className="max-w-2xl mx-auto bg-pixygreen p-8 rounded-lg shadow-md mt-4">
        <p className='text-center italic text-pixycyan'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae pariatur, maxime nulla dolores dignissimos similique voluptatum culpa iusto beatae eaque.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-pixypink text-sm font-bold mb-2">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-pixycyan focus:outline-none text-pixygreen"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-pixypink text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-pixycyan focus:outline-none text-pixygreen"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-pixypink text-sm font-bold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 rounded bg-pixycyan focus:outline-none text-pixygreen"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-pixypink text-white p-2 rounded hover:bg-pixycyan transition duration-300"
          >
            Envoyer
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Contact;
