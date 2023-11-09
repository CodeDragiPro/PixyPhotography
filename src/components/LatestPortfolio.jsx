import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Loader from "../components/ui/Loader";  
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../config/firebase";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import TitleSection from '../components/ui/TitleSection';

const LatestPortfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);  

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
        setLoading(false); 
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de Firebase:",
          error
        );
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-8">
      <div className="flex justify-between items-center">
        <TitleSection paragraphe="P" title="hotos Récente"/>
        <div className="flex justify-between items-center text-pixygreen md:text-xl text-lg animate-bounce">
          <Link to="/portfolio" className="flex items-center mx-2">
            Voir tous les projets
            <GoArrowRight size={25} className="font-bold ml-2" />
          </Link>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export default LatestPortfolio;
