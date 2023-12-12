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
    <div className="">
     
          <Link to="/portfolio" className="flex items-end justify-end mx-2 animate-bounce text-tertiary text-xl">
            Voir tous les photos
            <GoArrowRight size={25} className="font-bold ml-2" />
          </Link>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8 p-8">
          {portfolios.slice(0, 5).map((item, index) => (
            <div key={item.id} className="">
              <Card
                id={item.id}
                images={item.images}
                title={item.title}
                type={item.selectedTypes}
                date={item.date}
                tag={item.selectedCategories}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestPortfolio;
