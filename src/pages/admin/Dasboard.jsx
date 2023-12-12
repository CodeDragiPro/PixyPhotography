import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../config/firebase";
import DigitalClock from "../../components/ui/DigitalClock";
import TitleSection from '../../components/ui/TitleSection.jsx';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchPortfolioCount();
      } else {
        setUser(null);
      }
    });

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  const fetchPortfolioCount = async () => {
    const portfolioCollection = collection(db, "portfolio");
    const querySnapshot = await getDocs(portfolioCollection);
    const count = querySnapshot.size;
    setPortfolioCount(count);
  };

  if (!user) {
    return (
      <div>
        <p>Vous n'êtes pas autorisé.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto pt-8 flex-1 ">
      <TitleSection title="Dashboard"/>
      <div className="max-w-screen-md mx-auto p-4">
        
        <div className="h-32 bg-primary md:text-4xl text-3xl font-bold rounded-lg items-center justify-center flex text-tertiary">
          Bienvenue {user.displayName || "Pixy"}
        </div>

        <div className="flex flex-col md:flex-row md:justify-evenly items-center py-4">
          <div className="w-full md:w-40 bg-primary rounded-lg mb-4 md:mb-0">
            <DigitalClock />
          </div>

          <div className="text-center w-full md:w-40 bg-primary rounded-lg mb-4 md:mb-0">
            <div className="text-3xl font-bold text-white">
              {currentDateTime.getDate()}
            </div>
            <div className="text-lg font-bold text-white">
              {currentDateTime.toLocaleString("fr-FR", { month: "long" })}
            </div>
          </div>

          <div className="text-center w-full md:w-40 bg-primary rounded-lg">
            <div className="text-3xl font-bold text-white">
              {portfolioCount}
            </div>
            <div className="text-lg font-bold text-white">
              Photos au total
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
