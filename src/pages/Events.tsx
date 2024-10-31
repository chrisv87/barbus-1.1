import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, Gift, Calendar, MapPin, Loader } from 'lucide-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';

export default function Events() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      // Check if already registered
      const docRef = doc(db, 'event_signups', formData.email);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        toast.error('You have already registered for this event!');
        return;
      }

      // Register for event
      await setDoc(docRef, {
        ...formData,
        event: 'soft_launch',
        timestamp: new Date().toISOString(),
        guests: parseInt(formData.guests),
      });

      toast.success('Successfully registered! Check your email for details.');
      setFormData({ name: '', email: '', guests: '1' });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Soft Launch Party
          </h1>
          <p className="text-xl text-gray-300">Join us for our exclusive launch event!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
              <div className="flex items-center gap-3 mb-6">
                <PartyPopper className="w-8 h-8 text-purple-500" />
                <h2 className="text-2xl font-bold">Free Launch Event</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <span>November 1st, 2024 - 8:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <span>The B.O.B. - Downtown Grand Rapids</span>
                </div>
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-purple-500" />
                  <span>Prizes & Exclusive Offers</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-purple-900/20 rounded-lg">
                <h3 className="font-semibold mb-2">Event Highlights:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Free entry for all registered guests</li>
                  <li>Win a season pass (value: $500)</li>
                  <li>Exclusive drink specials</li>
                  <li>Meet the Bar Bus GR team</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-6">Register Now</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    disabled={loading}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={loading}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    required
                    disabled={loading}
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 disabled:opacity-50"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader className="w-5 h-5 animate-spin" />}
                  {loading ? 'Processing...' : 'Register for Free'}
                </button>

                <p className="text-sm text-gray-400 text-center">
                  Limited spots available. Registration required for entry.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}