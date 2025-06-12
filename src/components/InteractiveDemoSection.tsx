import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  Brain,
  FileText,
  Users,
  Calendar,
  Mic,
  MicOff,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Clock,
  Stethoscope,
  Activity,
  Heart,
  Thermometer,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Loader2,
  ArrowRight,
  Star,
  Shield
} from 'lucide-react';
import CTAButton from './ui/CTAButton';
import Card from './ui/Card';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

interface PatientData {
  name: string;
  age: number;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    respiratoryRate: number;
  };
  symptoms: string[];
  medications: string[];
}

const InteractiveDemoSection: React.FC = () => {
  const [isDemoVisible, setIsDemoVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({
    name: 'Sarah Johnson',
    age: 34,
    vitals: {
      bloodPressure: '140/90',
      heartRate: 78,
      temperature: 98.6,
      respiratoryRate: 16
    },
    symptoms: ['Chest pain', 'Shortness of breath'],
    medications: ['Lisinopril 10mg', 'Metformin 500mg']
  });
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Demo steps configuration
  const demoSteps: DemoStep[] = [
    {
      id: 'patient-overview',
      title: 'Patient Dashboard',
      description: 'View comprehensive patient information with AI-powered insights',
      component: <PatientOverviewDemo data={patientData} />
    },
    {
      id: 'voice-documentation',
      title: 'Voice Documentation',
      description: 'Experience real-time voice-to-text transcription with AI analysis',
      component: (
        <VoiceDocumentationDemo 
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          transcriptionText={transcriptionText}
          setTranscriptionText={setTranscriptionText}
          audioEnabled={audioEnabled}
        />
      )
    },
    {
      id: 'ai-insights',
      title: 'AI Clinical Insights',
      description: 'See how AI provides diagnostic suggestions and treatment recommendations',
      component: <AIInsightsDemo insights={aiInsights} />
    },
    {
      id: 'smart-scheduling',
      title: 'Smart Scheduling',
      description: 'Optimize appointments with AI-powered scheduling algorithms',
      component: <SmartSchedulingDemo />
    }
  ];

  const handleTryDemo = () => {
    setIsDemoVisible(true);
    setCurrentStep(0);
    // Scroll to demo section
    setTimeout(() => {
      document.getElementById('live-demo-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleResetDemo = () => {
    setCurrentStep(0);
    setIsRecording(false);
    setTranscriptionText('');
    setAiInsights([]);
    setIsLoading(false);
  };

  const handleNextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Simulate voice transcription
  const simulateVoiceTranscription = () => {
    const sampleText = "Patient presents with acute chest pain that started this morning. Pain is described as sharp, substernal, radiating to the left arm. Patient denies shortness of breath, nausea, or diaphoresis. Vital signs show elevated blood pressure at 140/90, heart rate 78, temperature 98.6°F.";
    
    setTranscriptionText('');
    setIsRecording(true);
    
    const words = sampleText.split(' ');
    let currentText = '';
    let wordIndex = 0;
    
    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
        setTranscriptionText(currentText);
        wordIndex++;
      } else {
        clearInterval(interval);
        setIsRecording(false);
        
        // Generate AI insights after transcription
        setTimeout(() => {
          setAiInsights([
            'Possible acute coronary syndrome - recommend ECG and cardiac enzymes',
            'Consider differential diagnosis: GERD, musculoskeletal pain, anxiety',
            'Blood pressure elevated - monitor and consider antihypertensive adjustment',
            'Recommend chest X-ray to rule out pneumothorax or other pulmonary causes'
          ]);
        }, 1000);
      }
    }, 150);
  };

  return (
    <div className="w-full">
      {/* Try Demo Button Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4 mr-2" />
              Experience AI-Powered Healthcare
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              See MediCore AI in Action
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience our revolutionary EMR platform with realistic patient scenarios. 
              No signup required - start exploring immediately.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <CTAButton
              variant="primary"
              size="xl"
              icon={Play}
              onClick={handleTryDemo}
              testId="try-demo-button"
              className="shadow-2xl hover:shadow-3xl transform transition-all duration-300"
              aria-label="Launch interactive demo of MediCore AI platform"
            >
              Try Interactive Demo
            </CTAButton>
          </motion.div>

          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              No signup required
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-blue-500 mr-2" />
              HIPAA compliant
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-purple-500 mr-2" />
              3-minute demo
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Demo Section */}
      <AnimatePresence>
        {isDemoVisible && (
          <motion.div
            id="live-demo-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Demo Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                    <Activity className="w-4 h-4 mr-2" />
                    <span className="font-medium">Live Demo Active</span>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Interactive MediCore AI Demo
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore our platform's key features with realistic patient data and scenarios.
                  Use the controls below to navigate through different functionalities.
                </p>
              </motion.div>

              {/* Demo Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <Card className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Step {currentStep + 1} of {demoSteps.length}: {demoSteps[currentStep].title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {demoSteps[currentStep].description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                      <button
                        onClick={handlePrevStep}
                        disabled={currentStep === 0}
                        className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous step"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={handleNextStep}
                        disabled={currentStep === demoSteps.length - 1}
                        className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next step"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      <CTAButton
                        variant="ghost"
                        size="sm"
                        icon={RotateCcw}
                        onClick={handleResetDemo}
                        testId="reset-demo-button"
                        aria-label="Reset demo to beginning"
                      >
                        Reset Demo
                      </CTAButton>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <motion.div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Step Navigation */}
                  <div className="flex flex-wrap gap-2">
                    {demoSteps.map((step, index) => (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStep(index)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          index === currentStep
                            ? 'bg-blue-100 text-blue-800'
                            : index < currentStep
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        aria-label={`Go to step ${index + 1}: ${step.title}`}
                      >
                        {index < currentStep && <CheckCircle className="w-3 h-3 inline mr-1" />}
                        {step.title}
                      </button>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Demo Content */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                {demoSteps[currentStep].component}
              </motion.div>

              {/* Demo Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <div className="text-center py-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to Transform Your Practice?
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      Experience the full power of MediCore AI with a personalized demo 
                      tailored to your practice's specific needs.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <CTAButton
                        variant="primary"
                        size="lg"
                        icon={Calendar}
                        testId="schedule-demo-button"
                      >
                        Schedule Personal Demo
                      </CTAButton>
                      
                      <CTAButton
                        variant="secondary"
                        size="lg"
                        icon={ArrowRight}
                        iconPosition="right"
                        testId="start-trial-button"
                      >
                        Start Free Trial
                      </CTAButton>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Patient Overview Demo Component
const PatientOverviewDemo: React.FC<{ data: PatientData }> = ({ data }) => {
  return (
    <Card>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient Info */}
        <div className="lg:col-span-1">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{data.name}</h3>
            <p className="text-gray-600">Age: {data.age} years</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Current Medications</h4>
              <div className="space-y-2">
                {data.medications.map((med, index) => (
                  <div key={index} className="px-3 py-2 bg-blue-50 rounded-lg text-sm">
                    {med}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
              <div className="space-y-2">
                {data.symptoms.map((symptom, index) => (
                  <div key={index} className="px-3 py-2 bg-red-50 rounded-lg text-sm">
                    {symptom}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vitals */}
        <div className="lg:col-span-2">
          <h4 className="font-medium text-gray-900 mb-4">Vital Signs</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600">Blood Pressure</p>
                  <p className="text-2xl font-bold text-red-800">{data.vitals.bloodPressure}</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-xs text-red-600 mt-2">Elevated - Monitor</p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Heart Rate</p>
                  <p className="text-2xl font-bold text-green-800">{data.vitals.heartRate} bpm</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-xs text-green-600 mt-2">Normal Range</p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Temperature</p>
                  <p className="text-2xl font-bold text-blue-800">{data.vitals.temperature}°F</p>
                </div>
                <Thermometer className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-xs text-blue-600 mt-2">Normal</p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Respiratory Rate</p>
                  <p className="text-2xl font-bold text-purple-800">{data.vitals.respiratoryRate}/min</p>
                </div>
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-xs text-purple-600 mt-2">Normal Range</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Voice Documentation Demo Component
const VoiceDocumentationDemo: React.FC<{
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  transcriptionText: string;
  setTranscriptionText: (text: string) => void;
  audioEnabled: boolean;
}> = ({ isRecording, setIsRecording, transcriptionText, setTranscriptionText, audioEnabled }) => {
  
  const handleStartRecording = () => {
    const sampleText = "Patient presents with acute chest pain that started this morning. Pain is described as sharp, substernal, radiating to the left arm. Patient denies shortness of breath, nausea, or diaphoresis. Vital signs show elevated blood pressure at 140/90, heart rate 78, temperature 98.6°F.";
    
    setTranscriptionText('');
    setIsRecording(true);
    
    const words = sampleText.split(' ');
    let currentText = '';
    let wordIndex = 0;
    
    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
        setTranscriptionText(currentText);
        wordIndex++;
      } else {
        clearInterval(interval);
        setIsRecording(false);
      }
    }, 150);
  };

  return (
    <Card>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recording Controls */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Voice Recording</h4>
            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartRecording}
              disabled={isRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto transition-colors ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              aria-label={isRecording ? "Recording in progress" : "Start voice recording"}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </motion.button>
            
            <p className="text-gray-600 mb-2">
              {isRecording ? 'Recording...' : 'Click to start voice recording'}
            </p>
            <p className="text-sm text-gray-500">
              Speak naturally about the patient's condition
            </p>
          </div>
        </div>

        {/* Transcription Output */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Real-time Transcription</h4>
          <div className="min-h-[200px] p-4 bg-gray-50 rounded-lg border">
            {transcriptionText ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-700 leading-relaxed"
              >
                {transcriptionText}
                {isRecording && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-5 bg-blue-500 ml-1"
                  />
                )}
              </motion.p>
            ) : (
              <p className="text-gray-500 italic">
                Transcribed text will appear here as you speak...
              </p>
            )}
          </div>
          
          {transcriptionText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center text-green-800">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">AI Processing Complete</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
};

// AI Insights Demo Component
const AIInsightsDemo: React.FC<{ insights: string[] }> = ({ insights }) => {
  return (
    <Card>
      <h4 className="font-medium text-gray-900 mb-6">AI Clinical Insights</h4>
      
      {insights.length > 0 ? (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <Brain className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-900 font-medium">AI Recommendation {index + 1}</p>
                <p className="text-blue-800 text-sm mt-1">{insight}</p>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: insights.length * 0.2 }}
            className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border"
          >
            <h5 className="font-medium text-gray-900 mb-3">Suggested Actions</h5>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-sm font-medium text-gray-800 mb-2">Immediate</h6>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Order ECG</li>
                  <li>• Cardiac enzyme panel</li>
                  <li>• Chest X-ray</li>
                </ul>
              </div>
              <div>
                <h6 className="text-sm font-medium text-gray-800 mb-2">Follow-up</h6>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Cardiology consultation</li>
                  <li>• Blood pressure monitoring</li>
                  <li>• Patient education</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            AI insights will appear here after voice transcription is complete
          </p>
        </div>
      )}
    </Card>
  );
};

// Smart Scheduling Demo Component
const SmartSchedulingDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-22');
  
  const timeSlots = [
    { time: '9:00 AM', available: true, patient: null },
    { time: '9:30 AM', available: false, patient: 'John Smith' },
    { time: '10:00 AM', available: true, patient: null },
    { time: '10:30 AM', available: true, patient: null },
    { time: '11:00 AM', available: false, patient: 'Maria Garcia' },
    { time: '11:30 AM', available: true, patient: null },
    { time: '2:00 PM', available: true, patient: null },
    { time: '2:30 PM', available: false, patient: 'Robert Wilson' },
    { time: '3:00 PM', available: true, patient: null },
    { time: '3:30 PM', available: true, patient: null },
  ];

  return (
    <Card>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar View */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">AI-Optimized Schedule</h4>
          <div className="space-y-2">
            {timeSlots.map((slot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  slot.available 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    slot.available ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <span className="font-medium text-gray-900">{slot.time}</span>
                </div>
                <div>
                  {slot.available ? (
                    <span className="text-green-600 text-sm">Available</span>
                  ) : (
                    <span className="text-gray-600 text-sm">{slot.patient}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">AI Scheduling Insights</h4>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">Optimization Suggestion</span>
              </div>
              <p className="text-blue-800 text-sm">
                Consider blocking 10:00-11:00 AM for urgent appointments based on historical patterns.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="font-medium text-yellow-900">No-Show Prediction</span>
              </div>
              <p className="text-yellow-800 text-sm">
                2:30 PM appointment has 15% no-show probability. Consider confirmation call.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="font-medium text-green-900">Efficiency Score</span>
              </div>
              <p className="text-green-800 text-sm">
                Today's schedule is 92% optimized with minimal wait times predicted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InteractiveDemoSection;