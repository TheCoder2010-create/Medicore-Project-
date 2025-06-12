import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Brain, 
  FileText, 
  Users, 
  BarChart3, 
  Calendar,
  Mic,
  MicOff,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';
import DemoSidebar from '../components/DemoSidebar';
import PatientCard from '../components/PatientCard';
import AIInsightCard from '../components/AIInsightCard';
import GeminiAIPanel from '../components/GeminiAIPanel';

const InteractiveDemo: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [geminiInsights, setGeminiInsights] = useState<any>(null);

  const demoPatients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 34,
      condition: 'Hypertension',
      lastVisit: '2024-01-15',
      riskLevel: 'low' as const,
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 67,
      condition: 'Diabetes Type 2',
      lastVisit: '2024-01-12',
      riskLevel: 'high' as const,
      avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      age: 28,
      condition: 'Annual Checkup',
      lastVisit: '2024-01-10',
      riskLevel: 'low' as const,
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const aiInsights = [
    {
      type: 'diagnosis' as const,
      title: 'Potential Drug Interaction Alert',
      description: 'Metformin and new ACE inhibitor may require dosage adjustment',
      severity: 'medium' as const,
      confidence: 92
    },
    {
      type: 'prediction' as const,
      title: 'Patient Risk Assessment',
      description: 'High probability of medication adherence based on patient history',
      severity: 'low' as const,
      confidence: 87
    },
    {
      type: 'recommendation' as const,
      title: 'Treatment Optimization',
      description: 'Consider lifestyle counseling for improved outcomes',
      severity: 'low' as const,
      confidence: 94
    }
  ];

  // Sample patient data for Gemini AI
  const samplePatientData = {
    symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue'],
    vitals: {
      bloodPressure: '140/90',
      heartRate: 78,
      temperature: 98.6,
      respiratoryRate: 16
    },
    medications: ['Lisinopril 10mg', 'Metformin 500mg', 'Aspirin 81mg'],
    history: 'Hypertension, Type 2 Diabetes',
    chiefComplaint: 'Chest pain radiating to left arm',
    labResults: {
      glucose: 145,
      cholesterol: 220,
      hba1c: 7.2
    },
    imagingResults: ['Chest X-ray normal', 'ECG shows mild ST changes']
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscriptionText('');
    
    // Simulate real-time transcription
    const sampleText = "Patient presents with chest pain that started this morning. Pain is described as sharp, located in the center of the chest, radiating to the left arm. Patient denies shortness of breath, nausea, or diaphoresis. Vital signs are stable with blood pressure 140/90, heart rate 78, temperature 98.6°F.";
    
    let currentText = '';
    const words = sampleText.split(' ');
    let wordIndex = 0;
    
    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
        setTranscriptionText(currentText);
        wordIndex++;
      } else {
        clearInterval(interval);
        setIsRecording(false);
        setTimeout(() => setShowAIInsights(true), 1000);
      }
    }, 200);
  };

  const handleGeminiInsights = (insights: any) => {
    setGeminiInsights(insights);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'documentation', label: 'AI Documentation', icon: FileText },
    { id: 'gemini-ai', label: 'Gemini 1.5 Pro', icon: Brain },
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'scheduling', label: 'Smart Scheduling', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DemoSidebar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
              <h1 className="text-2xl font-bold text-gray-900">MediCore AI Demo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Demo Mode
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                AI Active
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <Brain className="w-3 h-3 mr-1 inline" />
                Gemini 1.5 Pro
              </div>
              <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Powered by Alonix.io
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                        <p className="text-3xl font-bold text-gray-900">12</p>
                      </div>
                      <Calendar className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-sm text-green-600 mt-2">+2 from yesterday</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Gemini AI Insights</p>
                        <p className="text-3xl font-bold text-gray-900">47</p>
                      </div>
                      <Brain className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-sm text-green-600 mt-2">+15 this week</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Gemini Analytics</p>
                        <p className="text-3xl font-bold text-gray-900">23</p>
                      </div>
                      <Brain className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-sm text-green-600 mt-2">Advanced insights</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Time Saved Daily</p>
                        <p className="text-3xl font-bold text-gray-900">2.3h</p>
                      </div>
                      <Clock className="w-8 h-8 text-orange-500" />
                    </div>
                    <p className="text-sm text-green-600 mt-2">Per day average</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Recent AI Insights</h3>
                      <div className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        <Brain className="w-3 h-3 mr-1" />
                        Powered by Gemini
                      </div>
                    </div>
                    <div className="space-y-4">
                      {aiInsights.map((insight, index) => (
                        <AIInsightCard key={index} {...insight} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
                    <div className="space-y-4">
                      {demoPatients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <img
                              src={patient.avatar}
                              alt={patient.name}
                              className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{patient.name}</p>
                              <p className="text-sm text-gray-500">{patient.condition}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">10:30 AM</p>
                            <p className="text-xs text-gray-500">Follow-up</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'patients' && (
              <motion.div
                key="patients"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Add New Patient
                  </button>
                </div>
                
                <div className="grid gap-6">
                  {demoPatients.map((patient) => (
                    <PatientCard key={patient.id} {...patient} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'gemini-ai' && (
              <motion.div
                key="gemini-ai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <Brain className="w-7 h-7 text-green-600 mr-3" />
                      Gemini 1.5 Pro AI Assistant
                    </h2>
                    <p className="text-gray-600 mt-1">Advanced medical AI with multi-modal capabilities powered by Google</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Gemini 1.5 Pro
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      AI Active
                    </div>
                  </div>
                </div>
                
                <GeminiAIPanel 
                  patientData={samplePatientData}
                  onInsightsGenerated={handleGeminiInsights}
                />
              </motion.div>
            )}

            {activeTab === 'documentation' && (
              <motion.div
                key="documentation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">AI-Powered Documentation</h2>
                  <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <Brain className="w-4 h-4 mr-1" />
                    Enhanced by Gemini 1.5 Pro
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Voice Transcription</h3>
                      <button
                        onClick={handleStartRecording}
                        disabled={isRecording}
                        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                          isRecording 
                            ? 'bg-red-100 text-red-700 cursor-not-allowed' 
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {isRecording ? (
                          <>
                            <MicOff className="w-4 h-4 mr-2" />
                            Recording...
                          </>
                        ) : (
                          <>
                            <Mic className="w-4 h-4 mr-2" />
                            Start Recording
                          </>
                        )}
                      </button>
                    </div>
                    
                    <div className="min-h-[200px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      {transcriptionText ? (
                        <p className="text-gray-700 leading-relaxed">{transcriptionText}</p>
                      ) : (
                        <p className="text-gray-500 italic">Click "Start Recording" to begin voice transcription demo...</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Structured Documentation</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Chief Complaint</label>
                        <input
                          type="text"
                          value="Chest pain"
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">History of Present Illness</label>
                        <textarea
                          value="Patient presents with acute onset chest pain this morning. Pain is sharp, substernal, radiating to left arm. Denies SOB, nausea, diaphoresis."
                          readOnly
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vital Signs</label>
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" value="BP: 140/90" readOnly className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                          <input type="text" value="HR: 78" readOnly className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                          <input type="text" value="Temp: 98.6°F" readOnly className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                          <input type="text" value="RR: 16" readOnly className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {showAIInsights && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6"
                  >
                    <div className="flex items-center mb-4">
                      <Brain className="w-6 h-6 text-green-600 mr-2" />
                      <h3 className="text-lg font-semibold text-green-900">Gemini 1.5 Pro Analysis Complete</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Gemini ICD-10 Codes</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• R06.02 - Shortness of breath</li>
                          <li>• R50.9 - Fever, unspecified</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Recommended Tests</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• ECG with interpretation</li>
                          <li>• Chest X-ray PA/Lateral</li>
                          <li>• Troponin levels</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Clinical Alerts</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Consider acute coronary syndrome</li>
                          <li>• Monitor vital signs q15min</li>
                          <li>• Cardiology consultation</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'insights' && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">AI Clinical Insights</h2>
                  <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <Brain className="w-4 h-4 mr-1" />
                    Powered by Gemini 1.5 Pro
                  </div>
                </div>
                
                <div className="grid gap-6">
                  {aiInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AIInsightCard {...insight} expanded />
                    </motion.div>
                  ))}
                </div>

                {geminiInsights && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6"
                  >
                    <div className="flex items-center mb-4">
                      <Brain className="w-6 h-6 text-green-600 mr-2" />
                      <h3 className="text-lg font-semibold text-green-900">Advanced Gemini 1.5 Pro Insights</h3>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-medium text-green-900 mb-2">Gemini Clinical Analysis</h4>
                      <p className="text-sm text-gray-600">{geminiInsights.reasoningProcess}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'scheduling' && (
              <motion.div
                key="scheduling"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">Smart Scheduling</h2>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Optimized Schedule</h3>
                  <div className="grid grid-cols-7 gap-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="text-center">
                        <h4 className="font-medium text-gray-900 mb-2">{day}</h4>
                        <div className="space-y-2">
                          {[9, 10, 11, 14, 15, 16].map((hour) => (
                            <div
                              key={hour}
                              className={`p-2 rounded text-xs ${
                                Math.random() > 0.3 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {hour}:00
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;