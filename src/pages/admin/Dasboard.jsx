import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../config/firebase';

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
    const portfolioCollection = collection(db, 'portfolio');
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
    <div className="max-w-screen-md mx-auto p-4  font-Poppins">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="font-Poppins text-2xl  text-center mb-4">
          Bienvenue {user.displayName || 'Pixy'}
        </p>
        <p className='text-center'>Nous sommes le 
        <span className='font-bold text-pixygreen'> {currentDateTime.toLocaleDateString()}</span>, il est <span className='font-bold text-pixygreen'>{currentDateTime.toLocaleTimeString()}</span></p>
        <div className="border-t border-gray-300 my-4"></div>

        <div className="text-center">
          <p>Tu as actuelement :</p>
          <p className="text-3xl font-bold text-pixygreen">{portfolioCount}</p>
          <p className="text-gray-600">Photos</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
