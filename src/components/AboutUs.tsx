import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-500/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Weekend Transportation Service
            </h2>
            <p className="text-gray-300 text-lg mb-12">
              Launching in November 2024, Bar Bus GR brings reliable weekend transportation 
              between Allendale and Downtown Grand Rapids' most popular venues.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <Star className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Regular Service</h3>
              <p className="text-gray-400">Weekend transportation you can count on</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <Award className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-400">Deep knowledge of Grand Rapids' best venues</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Heart className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-gray-400">Dedicated to safe and reliable service</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;