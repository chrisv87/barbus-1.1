import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Megaphone, Calculator, Users, MapPin, Calendar } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: "Builder & Technical Lead",
      role: "Development & Infrastructure",
      icon: <Wrench className="w-8 h-8" />,
      description: "Software engineer and entrepreneur focused on building scalable transportation solutions. Leading the technical development and infrastructure of Bar Bus GR."
    },
    {
      name: "Marketing & Promotions",
      role: "Brand & Community Growth",
      icon: <Megaphone className="w-8 h-8" />,
      description: "Marketing specialist with deep connections in the Grand Rapids nightlife scene. Expert in social media strategy and community engagement."
    },
    {
      name: "Operations & Finance",
      role: "Internal Operations",
      icon: <Calculator className="w-8 h-8" />,
      description: "Financial analyst and operations expert specializing in business optimization and sustainable growth strategies. Managing the company's financial health and operations."
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            About Bar Bus GR
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Born from experience, driven by innovation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {team.map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20"
            >
              <div className="text-purple-500 mb-4">{member.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-purple-400 mb-3">{member.role}</p>
              <p className="text-gray-400">{member.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Bar Bus GR was born from our collective experience of providing over 25,000 rides through Uber in the Grand Rapids area. 
              Through these interactions, we identified a crucial gap in the market: the need for reliable, scheduled transportation 
              between Allendale and Downtown Grand Rapids' nightlife scene.
            </p>
            <p>
              As former rideshare drivers, we witnessed firsthand the challenges students and young professionals face when planning 
              their nights out. The inconsistent availability and rising costs of individual rides inspired us to create a more 
              efficient, affordable, and social transportation solution.
            </p>
            <p>
              In 2024, we combined our diverse expertise in technology, marketing, and finance to establish Bar Bus GR. Our mission 
              is to provide safe, reliable, and enjoyable transportation while building a community of regular riders who share our 
              passion for the Grand Rapids nightlife scene.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center gap-3 text-gray-300">
              <Users className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <span>25,000+ rides of experience</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <span>Local Grand Rapids expertise</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <span>Launching November 2024</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}