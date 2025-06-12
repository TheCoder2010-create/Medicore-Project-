import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Stethoscope, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Clock, 
  FileText,
  ChevronRight,
  Play,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import Header from '../components/Header';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import Footer from '../components/Footer';
import InteractiveDemoSection from '../components/InteractiveDemoSection';
import CTAButton from '../components/ui/CTAButton';
import CTAButtonGroup from '../components/ui/CTAButtonGroup';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Clinical Intelligence",
      description: "Advanced AI provides differential diagnoses, treatment recommendations, and proactive alerts for better patient outcomes.",
      color: "bg-blue-500"
    },
    {
      icon: FileText,
      title: "Intelligent Documentation",
      description: "Automated charting with NLP technology transcribes conversations and populates structured EMR fields in real-time.",
      color: "bg-green-500"
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Predict patient no-shows, identify at-risk patients, and optimize practice operations with data-driven insights.",
      color: "bg-purple-500"
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "AI-optimized scheduling minimizes wait times and maximizes resource utilization across your practice.",
      color: "bg-orange-500"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant Security",
      description: "Enterprise-grade security with end-to-end encryption, role-based access, and comprehensive audit trails.",
      color: "bg-red-500"
    },
    {
      icon: Users,
      title: "Patient Engagement Portal",
      description: "Comprehensive patient portal with self-scheduling, secure messaging, and educational resources.",
      color: "bg-teal-500"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Internal Medicine",
      content: "MediCore AI has transformed my practice. The AI documentation saves me 2 hours daily, and the clinical insights have improved my diagnostic accuracy significantly.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Family Practice",
      content: "The predictive analytics helped us reduce no-shows by 40%. The smart scheduling feature has optimized our workflow beyond expectations.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Dr. Emily Johnson",
      role: "Pediatrics",
      content: "The patient engagement portal has revolutionized how we communicate with families. Parents love the transparency and easy access to their children's health records.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Healthcare Revolution
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                The Future of
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Medical Records</span>
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Experience the next generation of EMR with AI-powered clinical intelligence, 
                automated documentation, and predictive analytics that transform how you practice medicine.
              </p>
              <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-8">
                <span>Powered by</span>
                <span className="ml-1 font-bold">Alonix.io</span>
              </div>
              
              <CTAButtonGroup spacing="lg">
                <CTAButton
                  variant="primary"
                  size="xl"
                  icon={Play}
                  onClick={() => navigate('/demo')}
                  testId="hero-demo-button"
                >
                  Try Interactive Demo
                </CTAButton>
                <CTAButton
                  variant="secondary"
                  size="xl"
                  icon={ArrowRight}
                  iconPosition="right"
                  testId="hero-consultation-button"
                >
                  Schedule Consultation
                </CTAButton>
              </CTAButtonGroup>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-500 to-teal-600 rounded-full opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Patient Dashboard</h3>
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      AI Active
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Brain className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium">AI Diagnosis Suggestion</span>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm font-medium">Auto Documentation</span>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center">
                        <BarChart3 className="w-5 h-5 text-purple-600 mr-3" />
                        <span className="text-sm font-medium">Risk Assessment</span>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <InteractiveDemoSection />

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionizing Healthcare with AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of AI-powered features addresses every aspect of modern medical practice,
              from clinical decision support to practice management optimization.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience the Future Today
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't just read about it – experience our AI-powered EMR platform firsthand. 
              Our interactive demo lets you explore all features with realistic patient scenarios.
            </p>
            <CTAButton
              variant="secondary"
              size="xl"
              icon={Play}
              onClick={() => navigate('/demo')}
              testId="demo-cta-button"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              Launch Interactive Demo
              <ChevronRight className="w-5 h-5 ml-2" />
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See how MediCore AI is transforming medical practices across the country
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;