import React, { useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore/lite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPortfolio = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const categories = ["Mariage", "Evenements", "Studio", "Nature"];
  const categoryRefs = categories.map(() => useRef());
  const [selectedDate, setSelectedDate] = useState(null);

  const savePortfolio = async (portfolio) => {
    try {
      await addDoc(collection(db, "portfolio"), portfolio);
      window.location.reload(false);
    } catch (error) {
      console.error("Failed to add portfolio", error);

    }
  };

  const submitPortfolio = async (e) => {
    e.preventDefault();
    if (!titleRef.current.value || !descriptionRef.current.value || !imageRef.current.files || !selectedDate) {
      toast.error("Veuillez remplir tous les champs obligatoires", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return; 
    }
  
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const images = imageRef.current.files;
    const date = selectedDate;
  
    const selectedCategories = categoryRefs
      .map((ref, index) => ({
        ref: ref,
        category: categories[index],
      }))
      .filter((category) => category.ref.current.checked)
      .map((category) => category.category);
  
    const imageUploadPromises = [];
    for (const image of images) {
      const storageRef = ref(storage, `portfolio/${image.name}`);
      const uploadPromise = uploadBytes(storageRef, image);
      imageUploadPromises.push(uploadPromise);
    }
    try {
      const snapshots = await Promise.all(imageUploadPromises);
      const downloadUrls = await Promise.all(
        snapshots.map((snapshot) => getDownloadURL(snapshot.ref))
      );
    
      const imageUrls = downloadUrls.map((url) => url);
      await savePortfolio({
        title,
        description,
        images: imageUrls,
        date,
        selectedCategories,
      });
      toast.success("Envoi des données en cours", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: true,
        onClose: () => {
          console.log("Fermeture du toast succès");
          window.location.href = "/dashboard";
        },
      });
    } catch (error) {
      console.error(error);
      await savePortfolio({
        title,
        description,
        images: [],
        date,
        selectedCategories,
      });
      toast.error("Une erreur s'est produite lors de l'envoi", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
  
  return (
    <div className="max-w-screen-md mx-auto py-20 p-4">
      <h1 className="text-center font-bold py-2 text-2xl text-pixygreen">Ajouter un Portfolio</h1>
      <form onSubmit={submitPortfolio} className="space-y-4  bg-pixygreen border border-codedragi-blue p-8 rounded">
        <div>
          <label htmlFor="title" className="text-lg  text-pixypink">
            Titre :
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 rounded focus:outline-none bg-pixycyan text-pixygreen"
            ref={titleRef}
            placeholder="Entrer le titre de la photo"
          />
        </div>
        <div>
          <label htmlFor="description" className="text-lg text-pixypink">
            Description :
          </label>
          <textarea
            id="description"
            className="w-full p-2 rounded focus:outline-none bg-pixycyan text-pixygreen"
            ref={descriptionRef}
            placeholder="Entrer la description de la photo"
          />
        </div>
        <div>
          <label htmlFor="images" className="text-lg text-pixypink">
            Images :
          </label>
          <input
            type="file"
            id="images"
            className="w-full p-2 border-2  rounded  focus:outline-none bg-pixycyan text-pixygreen"
            ref={imageRef}
          />
        </div>
        <div>
          <label className="text-lg text-pixypink">Date :</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Sélectionner une date"
            className="w-full p-2 rounded mx-2 focus:outline-none bg-pixycyan text-pixygreen"
          />
        </div>
        <div>
          <label className="text-lg text-pixypink">Catégorie :</label>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={category}
                ref={categoryRefs[index]}
                className="w-4 h-4 text-pixypink"
              />
              <label htmlFor={category} className="text-lg text-pixycyan">
                {category}
              </label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-codedragi-blue text-white p-2 rounded bg-pixycyan hover:bg-pixypink"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default NewPortfolio;
