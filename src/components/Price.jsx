import React from "react";
import TitleSection from "../components/ui/TitleSection";
import PriceCard from "../components/PriceCard";
import venise from "../assets/venise.jpg"
import bapteme from "../assets/bapteme.jpg"
import puydufou from '../assets/puydufou.jpg'
import londres from "../assets/londres.jpg"

const Price = () => {
  const priceItems = [
    {
      title: "Formule 1",
      image: venise,
      listItems: ["- 40/45 min de séance ", "- Minimum 5 photos numériques retouchées ", "- 1 photo imprimée offerte si accord de diffusion sur les réseaux sociaux ", "- Toutes les photos non retouchées avec possibilité de retouche ", "- Clé USB offerte", "- Impression photos à partir de 5 €"],
      price: "15€",
    },
    {
      title: "Formule 2",
      image: bapteme,
      listItems: ["- 1h de séance ", "- Minimum 10 photos numériques retouchées", "- 1 photo imprimée offerte si accord de diffusion sur les réseaux sociaux", "- Toutes les photos non retouchées avec possibilité de retouche", "- Clé USB offerte", "- Impression photos à partir de 5 €"],
      price: "30€",
    },
    {
      title: "Formule 3",
      image: puydufou,
      listItems: ["- Plus de 1 h jusqu’à 4h max", "- Minimum 15 photos numériques retouchées ", "- 1 photo imprimée offerte si accord de diffusion sur les réseaux sociaux ", "- Toutes les photos non retouchées avec possibilité de retouche ", "- Clé USB offerte", "- Impression photos à partir de 5 €"],
      price: "50€",
    },
    {
      title: "Formule 4",
      image: londres,
      listItems: ["- 1 journée", "- Minimum 30 photos numériques retouchées ", "- 1 photo imprimée offerte si accord de diffusion sur les réseaux sociaux ", "- Toutes les photos non retouchées avec possibilité de retouche", "- Clé USB offerte", "- Impression photos à partir de 5 €"],
      price: "100€",
    },
  ];

  return (
    <div className="" id="price">
       <TitleSection title="Tarifs"/>
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  text-center">
          {priceItems.map((item, index) => (
            <PriceCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Price;
