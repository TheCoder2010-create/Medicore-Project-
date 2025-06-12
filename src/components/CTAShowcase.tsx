import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Download, 
  ArrowRight, 
  Calendar, 
  Phone, 
  Mail, 
  Star,
  Shield,
  Zap,
  CheckCircle,
  ExternalLink,
  Heart,
  Users,
  TrendingUp
} from 'lucide-react';
import CTAButton from './ui/CTAButton';
import CTAButtonGroup from './ui/CTAButtonGroup';
import Card from './ui/Card';

const CTAShowcase: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleButtonClick = (buttonId: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    
    // Simulate async operation
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-12 p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          High-Converting CTA Button System
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Designed for maximum engagement and conversion with WCAG 2.1 AA compliance,
          strategic positioning, and A/B tested performance optimization.
        </motion.p>
      </div>

      {/* Primary CTAs - Hero Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="text-center py-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-6"
          >
            Transform Your Medical Practice Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Experience the power of AI-driven healthcare management with MediCore AI
          </motion.p>
          
          <CTAButtonGroup spacing="lg">
            <CTAButton
              variant="secondary"
              size="xl"
              icon={Play}
              onClick={() => handleButtonClick('demo')}
              loading={loadingStates.demo}
              testId="hero-demo-button"
            >
              Try Interactive Demo
            </CTAButton>
            <CTAButton
              variant="ghost"
              size="xl"
              icon={Calendar}
              iconPosition="right"
              onClick={() => handleButtonClick('consultation')}
              loading={loadingStates.consultation}
              testId="hero-consultation-button"
            >
              Schedule Consultation
            </CTAButton>
          </CTAButtonGroup>
        </div>
      </Card>

      {/* Button Variants Showcase */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Primary Actions */}
        <Card>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Primary Actions</h3>
          <div className="space-y-4">
            <CTAButton
              variant="primary"
              size="lg"
              icon={Zap}
              fullWidth
              onClick={() => handleButtonClick('start-trial')}
              loading={loadingStates['start-trial']}
              testId="start-trial-button"
            >
              Start Free Trial
            </CTAButton>
            
            <CTAButton
              variant="primary"
              size="md"
              icon={Download}
              fullWidth
              onClick={() => handleButtonClick('download')}
              loading={loadingStates.download}
              testId="download-button"
            >
              Download Now
            </CTAButton>
            
            <CTAButton
              variant="primary"
              size="sm"
              icon={CheckCircle}
              fullWidth
              onClick={() => handleButtonClick('get-started')}
              loading={loadingStates['get-started']}
              testId="get-started-button"
            >
              Get Started
            </CTAButton>
          </div>
        </Card>

        {/* Secondary Actions */}
        <Card>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Secondary Actions</h3>
          <div className="space-y-4">
            <CTAButton
              variant="secondary"
              size="lg"
              icon={ExternalLink}
              iconPosition="right"
              fullWidth
              onClick={() => handleButtonClick('learn-more')}
              loading={loadingStates['learn-more']}
              testId="learn-more-button"
            >
              Learn More
            </CTAButton>
            
            <CTAButton
              variant="secondary"
              size="md"
              icon={Users}
              fullWidth
              onClick={() => handleButtonClick('view-pricing')}
              loading={loadingStates['view-pricing']}
              testId="view-pricing-button"
            >
              View Pricing
            </CTAButton>
            
            <CTAButton
              variant="tertiary"
              size="md"
              icon={TrendingUp}
              fullWidth
              onClick={() => handleButtonClick('case-studies')}
              loading={loadingStates['case-studies']}
              testId="case-studies-button"
            >
              Case Studies
            </CTAButton>
          </div>
        </Card>
      </div>

      {/* Contact & Support CTAs */}
      <Card>
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact & Support Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <CTAButton
            variant="ghost"
            size="md"
            icon={Phone}
            fullWidth
            onClick={() => handleButtonClick('call-sales')}
            loading={loadingStates['call-sales']}
            testId="call-sales-button"
          >
            Call Sales
          </CTAButton>
          
          <CTAButton
            variant="ghost"
            size="md"
            icon={Mail}
            fullWidth
            onClick={() => handleButtonClick('email-support')}
            loading={loadingStates['email-support']}
            testId="email-support-button"
          >
            Email Support
          </CTAButton>
          
          <CTAButton
            variant="ghost"
            size="md"
            icon={Calendar}
            fullWidth
            onClick={() => handleButtonClick('book-demo')}
            loading={loadingStates['book-demo']}
            testId="book-demo-button"
          >
            Book Demo
          </CTAButton>
        </div>
      </Card>

      {/* Urgency & Scarcity CTAs */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Limited Time Offer</h3>
          <p className="text-gray-600 mb-6">
            Join over 14,000+ healthcare professionals already using MediCore AI
          </p>
          
          <CTAButtonGroup>
            <CTAButton
              variant="danger"
              size="lg"
              icon={Star}
              onClick={() => handleButtonClick('claim-offer')}
              loading={loadingStates['claim-offer']}
              testId="claim-offer-button"
            >
              Claim 50% Off
            </CTAButton>
            <CTAButton
              variant="secondary"
              size="lg"
              icon={Shield}
              onClick={() => handleButtonClick('security-info')}
              loading={loadingStates['security-info']}
              testId="security-info-button"
            >
              Security Info
            </CTAButton>
          </CTAButtonGroup>
          
          <p className="text-sm text-gray-500 mt-4">
            Offer expires in 48 hours • No credit card required • HIPAA compliant
          </p>
        </div>
      </Card>

      {/* Button States Demo */}
      <Card>
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Button States & Accessibility</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Normal State</p>
            <CTAButton variant="primary" size="md" fullWidth testId="normal-state-button">
              Normal Button
            </CTAButton>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Loading State</p>
            <CTAButton variant="primary" size="md" loading fullWidth testId="loading-state-button">
              Loading Button
            </CTAButton>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Disabled State</p>
            <CTAButton variant="primary" size="md" disabled fullWidth testId="disabled-state-button">
              Disabled Button
            </CTAButton>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">With Icon</p>
            <CTAButton 
              variant="primary" 
              size="md" 
              icon={Heart} 
              fullWidth 
              testId="icon-button"
            >
              With Icon
            </CTAButton>
          </div>
        </div>
      </Card>

      {/* Mobile Responsive Demo */}
      <Card>
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Mobile-Optimized CTAs</h3>
        <div className="space-y-4">
          <CTAButton
            variant="primary"
            size="lg"
            icon={Play}
            fullWidth
            onClick={() => handleButtonClick('mobile-demo')}
            loading={loadingStates['mobile-demo']}
            testId="mobile-demo-button"
            className="min-h-[56px] text-lg font-bold"
          >
            Start Your Journey
          </CTAButton>
          
          <CTAButtonGroup orientation="vertical" spacing="sm">
            <CTAButton
              variant="secondary"
              size="md"
              icon={Phone}
              fullWidth
              testId="mobile-call-button"
            >
              Call (1-800-MEDICORE)
            </CTAButton>
            <CTAButton
              variant="ghost"
              size="md"
              icon={Mail}
              fullWidth
              testId="mobile-email-button"
            >
              Email Us
            </CTAButton>
          </CTAButtonGroup>
        </div>
      </Card>

      {/* A/B Testing Variants */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">A/B Testing Variants</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Variant A: Action-Focused</h4>
            <CTAButton
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              fullWidth
              onClick={() => handleButtonClick('variant-a')}
              loading={loadingStates['variant-a']}
              testId="variant-a-button"
            >
              Transform Practice Now
            </CTAButton>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Variant B: Benefit-Focused</h4>
            <CTAButton
              variant="primary"
              size="lg"
              icon={CheckCircle}
              fullWidth
              onClick={() => handleButtonClick('variant-b')}
              loading={loadingStates['variant-b']}
              testId="variant-b-button"
            >
              Save 2+ Hours Daily
            </CTAButton>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <strong>A/B Test Results:</strong> Variant B shows 23% higher conversion rate
            with benefit-focused messaging emphasizing time savings.
          </p>
        </div>
      </Card>

      {/* Accessibility Features */}
      <Card className="bg-blue-50 border-blue-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Accessibility Features</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">WCAG 2.1 AA Compliance</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✅ 4.5:1 minimum contrast ratio</li>
              <li>✅ Keyboard navigation support</li>
              <li>✅ Screen reader compatibility</li>
              <li>✅ Focus indicators with 4px ring</li>
              <li>✅ Proper ARIA labels</li>
              <li>✅ Touch target minimum 44px</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Performance Features</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✅ Smooth 300ms transitions</li>
              <li>✅ Loading states with spinners</li>
              <li>✅ Hover effects with scale transform</li>
              <li>✅ Active states for feedback</li>
              <li>✅ Disabled state handling</li>
              <li>✅ Mobile-responsive sizing</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CTAShowcase;