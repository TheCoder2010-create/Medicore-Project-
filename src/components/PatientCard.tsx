import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface PatientCardProps {
  id: number;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  riskLevel: 'low' | 'medium' | 'high';
  avatar: string;
}

const PatientCard: React.FC<PatientCardProps> = ({ 
  name, 
  age, 
  condition, 
  lastVisit, 
  riskLevel, 
  avatar 
}) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return AlertTriangle;
      case 'medium': return Clock;
      default: return CheckCircle;
    }
  };

  const RiskIcon = getRiskIcon(riskLevel);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-gray-600">Age: {age} • {condition}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              Last visit: {lastVisit}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskLevel)}`}>
            <RiskIcon className="w-4 h-4 mr-1" />
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            View Details
          </button>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Blood Pressure</p>
            <p className="font-medium text-gray-900">120/80</p>
          </div>
          <div>
            <p className="text-gray-500">Heart Rate</p>
            <p className="font-medium text-gray-900">72 bpm</p>
          </div>
          <div>
            <p className="text-gray-500">Temperature</p>
            <p className="font-medium text-gray-900">98.6°F</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientCard;