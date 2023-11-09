import React from 'react';
import Hero from '../components/Hero';
import LatestPortfolio from '../components/LatestPortfolio';
import Price from '../components/Price';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="pt-20">
      <Hero/>
      <LatestPortfolio/>
      <Price/>
      <About/>
      <Contact/>
    </div>
  );
};

export default Home;
