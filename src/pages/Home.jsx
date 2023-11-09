import React from 'react';
import Hero from '../components/Hero';
import LatestPortfolio from '../components/LatestPortfolio';
import Price from '../components/Price';
import About from '../components/About';

const Home = () => {
  return (
    <div className="pt-20">
 
      <Hero/>
      {/* <hr className="border-t border-pixypink my-4 w-1/2" /> */}
      <LatestPortfolio/>
      <Price/>
      <About/>
    </div>
  );
};

export default Home;
