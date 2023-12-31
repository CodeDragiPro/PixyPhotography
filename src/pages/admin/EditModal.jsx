import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore/lite";
import { db } from "../../config/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditModal = ({ portfolio, closeModal, updatePortfolio }) => {
  const [updatedPortfolio, setUpdatedPortfolio] = useState({ ...portfolio });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleUpdatePortfolio = async () => {
    try {
      const portfolioDocRef = doc(db, "portfolio", updatedPortfolio.id);
      const updatedData = {
        title: updatedPortfolio.title,
        description: updatedPortfolio.description,
        images: updatedPortfolio.images,
        date: selectedDate,
        selectedCategories: updatedPortfolio.selectedCategories,
      };

      await updateDoc(portfolioDocRef, updatedData);
      updatePortfolio(updatedData);
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document :", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-black/60 ">
      <div className="bg-primary p-6 rounded-lg md:w-1/2 overflow-y-scroll max-h-screen">
        <h2 className="text-2xl text-white mb-4 text-center">
          Modifier la Photo
        </h2>
        <div className="p-2">
          <label
            htmlFor="title"
            className="text-lg text-white"
          >
            Titre :
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 rounded focus:outline-none  text-tertiary"
            value={updatedPortfolio.title}
            onChange={(e) =>
              setUpdatedPortfolio({
                ...updatedPortfolio,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="p-2">
          <label
            htmlFor="description"
            className="text-lg text-white"
          >
            Description :
          </label>
          <textarea
            id="description"
            className="w-full p-2 rounded focus:outline-none text-tertiary"
            value={updatedPortfolio.description}
            onChange={(e) =>
              setUpdatedPortfolio({
                ...updatedPortfolio,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="p-2">
          <label className="text-lg text-white">Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full p-2 rounded mx-2 focus:outline-none  text-tertiary"
          />
        </div>
        <div className="p-2">
          <label className="text-lg text-white">
            Catégories :
          </label>
          {updatedPortfolio.selectedCategories.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={category}
                className="w-4 h-4 text-codedragi-blue"
                checked={category}
                onChange={() => {
                  const newCategories = [
                    ...updatedPortfolio.selectedCategories,
                  ];
                  newCategories[index] = !newCategories[index];
                  setUpdatedPortfolio({
                    ...updatedPortfolio,
                    selectedCategories: newCategories,
                  });
                }}
              />
              <label htmlFor={category} className="text-lg text-tertiary">
                {category}
              </label>
            </div>
          ))}
        </div>
        <div className="flex space-x-4 mt-2 p-2">
          <button
            onClick={handleUpdatePortfolio}
            className="bg-secondary hover:bg-tertiary text-white p-2 rounded "
          >
            Enregistrer
          </button>
          <button
            onClick={closeModal}
            className="bg-tertiary text-white p-2 rounded hover:bg-secondary"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
