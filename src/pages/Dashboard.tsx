import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Brain, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Total Patients',
      value: '2,847',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: 'Gemini AI Insights',
      value: '1,234',
      change: '+23%',
      changeType: 'increase',
      icon: Brain,
    },
    {
      name: 'Active Sessions',
      value: '1,234',
      change: '-3%',
      changeType: 'decrease',
      icon: Activity,
    },
    {
      name: 'Time Saved Daily',
      value: '2.3h',
      change: '+15%',
      changeType: 'increase',
      icon: Clock,
    },
  ];

  const recentActivity = [
    { id: 1, user: 'Dr. Sarah Chen', action: 'Generated Gemini clinical insights', time: '2 minutes ago', type: 'ai' },
    { id: 2, user: 'Dr. Michael Rodriguez', action: 'Completed voice documentation', time: '5 minutes ago', type: 'documentation' },
    { id: 3, user: 'Emily Johnson NP', action: 'Used Gemini for diagnosis', time: '10 minutes ago', type: 'ai' },
    { id: 4, user: 'Dr. Sarah Chen', action: 'Updated patient records', time: '15 minutes ago', type: 'update' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ai': return <Brain className="w-4 h-4 text-green-600" />;
      case 'documentation': return <Brain className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-green-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your MediCore AI platform today.
        </p>
        <div className="mt-2 flex items-center text-sm text-green-600">
          <Brain className="w-4 h-4 mr-1" />
          Gemini 1.5 Pro is actively enhancing your clinical workflows
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      stat.icon === Brain ? 'bg-green-100' : 'bg-primary-100'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        stat.icon === Brain ? 'text-green-600' : 'text-primary-600'
                      }`} />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <div className={`ml-2 flex items-center text-sm ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.changeType === 'increase' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        <span className="ml-1">{stat.change}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI Analytics Overview</h3>
              <div className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                <Brain className="w-3 h-3 mr-1" />
                Gemini Powered
              </div>
            </div>
            <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Brain className="h-12 w-12 text-green-400 mx-auto mb-2" />
                <p className="text-gray-500">AI Analytics Dashboard</p>
                <p className="text-sm text-gray-400">Powered by Gemini 1.5 Pro</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent AI Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Gemini Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Gemini 1.5 Pro AI Features</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white rounded-lg hover:shadow-md transition-all text-left group">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
                <Brain className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Clinical Reasoning</h4>
              <p className="text-sm text-gray-500">Advanced multi-modal clinical analysis and reasoning</p>
            </button>
            
            <button className="p-4 bg-white rounded-lg hover:shadow-md transition-all text-left group">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-200 transition-colors">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">Predictive Analytics</h4>
              <p className="text-sm text-gray-500">Advanced patient risk assessment and outcome prediction</p>
            </button>
            
            <button className="p-4 bg-white rounded-lg hover:shadow-md transition-all text-left group">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-purple-200 transition-colors">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900">Research Insights</h4>
              <p className="text-sm text-gray-500">Latest medical research and treatment developments</p>
            </button>
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">Add New Patient</h4>
              <p className="text-sm text-gray-500">Create a new patient record with AI assistance</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <Brain className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Generate AI Insights</h4>
              <p className="text-sm text-gray-500">Get Gemini 1.5 Pro clinical recommendations</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900">View Analytics</h4>
              <p className="text-sm text-gray-500">Analyze practice performance and AI usage</p>
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;