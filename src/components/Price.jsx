import React from "react";
import TitleSection from "./ui/TitleSection";
import PriceCard from "../components/PriceCard";
import Mariage from "../assets/mariage.jpeg"; 
import Evenements from '../assets/evenement.jpeg';
import Studio from '../assets/studio.jpg';
import Nature from '../assets/nature.jpg';

const Price = () => {
  const priceItems = [
    {
      title: "Mariage",
      image: Mariage,
      description: "Forfait complet pour votre mariage.",
      listItems: ["Élément 1", "Élément 2", "Élément 3"],
      price: "1000€",
    },
    {
      title: "Evènement",
      image: Evenements,
      description: "Forfait complet pour votre Évènement.",
      listItems: ["Élément 1", "Élément 2", "Élément 3"],
      price: "500€",
    },
    {
      title: "Studio",
      image: Studio,
      description: "Forfait complet pour des photos en studio",
      listItems: ["Élément 1", "Élément 2", "Élément 3"],
      price: "300€",
    },
    {
      title: "Nature",
      image: Nature,
      description: "Forfait complet pour des photos de la nature",
      listItems: ["Élément 1", "Élément 2", "Élément 3"],
      price: "100€",
    },
  ];

  return (
    <div className="bg-white">
      <TitleSection paragraphe="T" title="arifs" />
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 text-center">
          {priceItems.map((item, index) => (
            <PriceCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Price;
