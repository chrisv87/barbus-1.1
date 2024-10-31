import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, CreditCard, Clock } from 'lucide-react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const auth = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleNotifications = async () => {
    if (!auth?.currentUser) return;
    
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        notifications: !notifications
      });
      setNotifications(!notifications);
      toast.success('Preferences updated!');
    } catch (error) {
      toast.error('Failed to update preferences');
    }
  };

  const handleLogout = async () => {
    try {
      await auth?.logout();
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
        >
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Early Access Dashboard
          </h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Launch Updates</h2>
            <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
              <p className="text-gray-300">
                🎉 Thanks for joining our early access list! We're launching in November 2024.
                You'll be first to know about our weekend routes and special offers.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="text-purple-500" />
                <span>Email Updates</span>
              </div>
              <button
                onClick={toggleNotifications}
                className={`px-4 py-2 rounded-full ${
                  notifications ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                {notifications ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="text-purple-500" />
                <div>
                  <p className="font-medium">Weekend Service</p>
                  <p className="text-sm text-gray-400">Starting November 2024</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="text-purple-500" />
                <div>
                  <p className="font-medium">Operating Hours</p>
                  <p className="text-sm text-gray-400">Fridays & Saturdays, 8PM - 4AM</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}