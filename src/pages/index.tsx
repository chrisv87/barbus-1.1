import type { NextPage } from 'next';
import Hero from '../components/Hero';
import Features from '../components/Features';
import AboutUs from '../components/AboutUs';

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <AboutUs />
    </>
  );
};

export default Home;