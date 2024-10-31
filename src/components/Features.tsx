import React from 'react';
import { motion } from 'framer-motion';
import { Bus, MapPin, Music, Users, Clock, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Bus className="w-8 h-8" />,
      title: "Premium Transportation",
      description: "Safe and comfortable transportation between venues"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Custom Routes",
      description: "Regular weekend service from Allendale to Downtown GR"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Entertainment",
      description: "State-of-the-art sound system and ambient lighting"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Events",
      description: "Perfect for parties and special events"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Regular Schedule",
      description: "Weekend service from 8 PM to 4 AM"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "VIP Experience",
      description: "Premium amenities and personalized service"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Your Weekend Transportation
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Safe, reliable transportation between Allendale and Downtown Grand Rapids
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20"
            >
              <div className="text-purple-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;