import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../config/firebase";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

const LatestPortfolio = () => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        const portfolioData = [];
        querySnapshot.forEach((doc) => {
          const portfolio = {
            id: doc.id,
            ...doc.data(),
          };
          portfolioData.push(portfolio);
        });
        setPortfolios(portfolioData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de Firebase:",
          error
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="md:text-4xl text-2xl text-pixygreen"><span className="text-pixypink text-5xl opacity-50">P</span>hotos Récente</h1>
        <div className="flex justify-between items-center text-pixygreen md:text-xl text-lg animate-bounce">
        <Link to="/portfolio" className="flex items-center mx-2">
            Voir tous les projets
            <GoArrowRight size={25} className="font-bold ml-2" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {portfolios.slice(0, 5).map((item, index) => (
          <div key={item.id} className="flex justify-center">
            <Card
              id={item.id}
              images={item.images}
              title={item.title}
              type={item.selectedTypes}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPortfolio;
