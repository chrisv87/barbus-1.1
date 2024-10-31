import React from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';

const QRSection = () => {
  const signupUrl = `https://barbus-gr.com/signup`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(signupUrl)}`;

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 text-center"
        >
          <QrCode className="w-16 h-16 text-purple-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Quick Access
          </h2>
          <p className="text-gray-300 mb-8">
            Scan our QR code to sign up for early access and stay updated on our launch
          </p>
          <div className="max-w-xs mx-auto p-4 bg-white rounded-xl">
            <img
              src={qrCodeUrl}
              alt="Bar Bus GR Sign Up QR Code"
              className="w-full h-auto"
            />
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Or visit: <a href={signupUrl} className="text-purple-400 hover:text-purple-300">{signupUrl}</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QRSection;