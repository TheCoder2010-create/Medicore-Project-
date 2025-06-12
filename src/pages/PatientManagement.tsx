import React from 'react';
import { motion } from 'framer-motion';

const PatientManagement: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
      <p className="text-gray-600 mt-2">Manage your patient records and information</p>
    </motion.div>
  );
};

export default PatientManagement;