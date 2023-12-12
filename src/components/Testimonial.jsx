import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import { db } from "../config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";

const Testimonial = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    pseudo: "",
    message: "",
    note: "",
  });
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const renderStars = (rating) => {
    return "★".repeat(Number(rating)) + "☆".repeat(5 - Number(rating));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "testimonials"), {
        pseudo: formData.pseudo,
        message: formData.message,
        note: formData.note,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setFormData({
      pseudo: "",
      message: "",
      note: "",
    });
    closeModal();
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const testimonialsData = [];

      querySnapshot.forEach((doc) => {
        testimonialsData.push({ id: doc.id, ...doc.data() });
      });

      setTestimonials(testimonialsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full p-4">
      {testimonials
        .slice(currentIndex, currentIndex + 5)
        .map((testimonial, index) => (
          <div
            key={index}
            className={`md:w-1/2 w-full bg-secondary flex flex-col items-center justify-center rounded mb-2 text-white py-4 ${
              index === 0 ? "" : "hidden"
            }`}
          >
            <p className="font-bold">{testimonial.pseudo}</p>
            <div>{renderStars(testimonial.note)}</div>
            <p className="mt-4 italic">" {testimonial.message} "</p>
          </div>
        ))}

      <div className="flex-col items-center justify-center -full">
        <button
          onClick={openModal}
          className="bg-primary text-white py-2 px-4 rounded mt-2"
        >
          Donnez le vôtre
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-70 bg-black p-4">
          <div className="md:w-1/2 w-full p-4 bg-secondary rounded shadow-md">
            <FaTimes
              onClick={closeModal}
              className="text-white absolute top-2 right-2"
              size={20}
            />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="pseudo" className="text-lg text-white">
                  Pseudo :
                </label>
                <input
                  type="text"
                  id="pseudo"
                  name="pseudo"
                  value={formData.pseudo}
                  onChange={handleChange}
                  className="w-full p-2 rounded focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="text-lg text-white">
                  Message :
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 rounded focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="note" className="text-lg text-white">
                  Note :
                </label>
                <select
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full p-2 rounded focus:outline-none"
                  required
                >
                  <option value="" disabled>
                    Sélectionnez une note
                  </option>
                  <option value="1">1 étoile</option>
                  <option value="2">2 étoiles</option>
                  <option value="3">3 étoiles</option>
                  <option value="4">4 étoiles</option>
                  <option value="5">5 étoiles</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded"
              >
                Valider
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Testimonial;
