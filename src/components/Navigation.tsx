import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bus, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  return (
    <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Bus className="h-8 w-8 text-pink-500" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              BAR BUS GR
            </span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link to="/routes" className="text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium">
                Routes
              </Link>
              <Link to="/events" className="text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium">
                Events
              </Link>
              {auth?.currentUser ? (
                <Link to="/dashboard" className="text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
              ) : (
                <Link to="/signup" className="text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium">
                  Early Access
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-300 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link to="/routes" className="text-gray-300 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
              Routes
            </Link>
            <Link to="/events" className="text-gray-300 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
              Events
            </Link>
            {auth?.currentUser ? (
              <Link to="/dashboard" className="text-gray-300 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </Link>
            ) : (
              <Link to="/signup" className="text-gray-300 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
                Early Access
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;