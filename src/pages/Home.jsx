import React from 'react';
import Hero from '../components/Hero';
import LatestPortfolio from '../components/LatestPortfolio';
import Price from '../components/Price';
import About from '../components/About';
import Contact from '../components/Contact';
import TitleSection from '../components/ui/TitleSection';
import Testimonial from '../components/testimonial';
const Home = () => {
  return (
    <div className=" flex-1">
      <Hero/>
      <TitleSection title="Dernieres photos"/>
      <div className='bg-gray-100 py-8'>
      <LatestPortfolio/>
      </div>
     
      <Price/>
      <TitleSection title="A propos"/>
      <div className='bg-gray-100 py-8'>
      <About/>
      </div>
      <TitleSection title="Contact"/>
      <Contact/>
      <TitleSection title="Avis"/>
      <Testimonial/>
    </div>
  );
};

export default Home;
