import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Bell } from 'lucide-react';

const DownloadApp = () => {
  const signupUrl = `https://barbus-gr.com/signup`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(signupUrl)}`;

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Stay Connected
              </h2>
              <p className="text-gray-300 mb-6">
                Follow us on social media for updates and special offers.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <span>Real-time bus location updates</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span>Route schedules and timing</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Bell className="w-5 h-5 text-purple-500" />
                  <span>Event notifications and special offers</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <img
                src={qrCodeUrl}
                alt="Bar Bus GR QR Code"
                className="mx-auto mb-4 rounded-xl bg-white p-4"
              />
              <p className="text-sm text-gray-400">
                Scan to stay updated on our launch
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Or visit: <a href={signupUrl} className="text-purple-400 hover:text-purple-300">{signupUrl}</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadApp;