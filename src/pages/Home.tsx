import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import AboutUs from '../components/AboutUs';
import QRSection from '../components/QRSection';
import DownloadApp from '../components/DownloadApp';

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <Features />
      <AboutUs />
      <QRSection />
      <DownloadApp />
    </div>
  );
}