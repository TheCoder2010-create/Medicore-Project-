import React from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

interface AIInsightCardProps {
  type: 'diagnosis' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  expanded?: boolean;
}

const AIInsightCard: React.FC<AIInsightCardProps> = ({ 
  type, 
  title, 
  description, 
  severity, 
  confidence, 
  expanded = false 
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'diagnosis': return AlertTriangle;
      case 'prediction': return TrendingUp;
      default: return CheckCircle;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'diagnosis': return 'text-red-600 bg-red-100';
      case 'prediction': return 'text-blue-600 bg-blue-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const TypeIcon = getTypeIcon(type);

  return (
    <motion.div
      whileHover={{ scale: expanded ? 1 : 1.02 }}
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ${
        expanded ? 'p-6' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${getTypeColor(type)} mr-3`}>
            <TypeIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600 capitalize">{type}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(severity)}`}>
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Brain className="w-4 h-4 mr-1" />
            {confidence}%
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 leading-relaxed">{description}</p>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Recommended Actions</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Review patient medication list</li>
                <li>• Schedule follow-up appointment</li>
                <li>• Consider alternative treatments</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Supporting Evidence</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Clinical guidelines (AHA 2023)</li>
                <li>• Patient history analysis</li>
                <li>• Drug interaction database</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Accept Recommendation
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Dismiss
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AIInsightCard;