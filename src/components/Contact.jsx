import React, { useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TitleSection from "./ui/TitleSection";

const Contact = () => {
  const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const userID = import.meta.env.VITE_EMAIL_USER_ID;
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs.sendForm(serviceID, templateID, form.current, userID).then(
      function (response) {
        console.log("E-mail envoyé", response);
        toast.success('E-mail envoyé avec succès');
      },
      function (error) {
        console.error("Erreur lors de l'envoi de l'e-mail", error);
        toast.error('Erreur lors de l\'envoi de l\'e-mail');
      }
    );
  };
  

  useEffect(() => {
    emailjs.init(userID);
  }, []);

  return ( 
    <div className="" id='contact'>
    <div className='pb-8 p-4'>
      <div className="max-w-4xl mx-auto bg-secondary p-8 rounded-lg shadow-md mt-4 ">
        <p className='text-center italic text-white'>Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
        <form ref={form} id="contact-form" onSubmit={sendEmail}>
          <div className="mb-4">
            <label htmlFor="user_name" className="block text-primary text-sm font-bold mb-2">Nom</label>
            <input
              type="text"
              id="user_name"
              name="from_name"
              className="w-full p-2 rounded focus:outline-none text-secondary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-primary text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="user_email"
              className="w-full p-2 rounded focus:outline-none text-secondary"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-primary text-sm font-bold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              className="w-full p-2 rounded  focus:outline-none text-secondary"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-tertiary text-white p-2 rounded hover:bg-primary transition duration-300"
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
