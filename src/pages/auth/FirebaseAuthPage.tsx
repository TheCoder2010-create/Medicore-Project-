import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FirebaseAuth from '../../components/auth/FirebaseAuth';

const FirebaseAuthPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-white/90 transition-all duration-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </motion.button>
      </div>

      {/* Auth Component */}
      <FirebaseAuth />
    </div>
  );
};

export default FirebaseAuthPage;