import React from 'react';
import { motion } from 'framer-motion';

const Analytics: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
      <p className="text-gray-600 mt-2">View insights and analytics for your practice</p>
    </motion.div>
  );
};

export default Analytics;