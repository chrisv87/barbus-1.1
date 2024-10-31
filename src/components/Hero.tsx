import React from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80"
          alt="Luxury Party Bus"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Experience Grand Rapids
            </span>
            <br />
            <span className="text-white">Like Never Before</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Your weekend transportation to Grand Rapids' hottest spots.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-purple-600 rounded-full text-lg font-semibold flex items-center gap-2 hover:bg-purple-700 transition-colors"
            >
              <PartyPopper className="w-5 h-5" />
              Get Updates
            </Link>
            
            <Link
              to="/routes"
              className="px-8 py-4 border border-purple-500 rounded-full text-lg font-semibold flex items-center gap-2 hover:bg-purple-500/10 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              View Routes
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-2 text-purple-400">
              <Calendar className="w-5 h-5" />
              <span>Weekend Service Starting November 2024</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <MapPin className="w-5 h-5" />
              <span>Allendale to Downtown GR</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;