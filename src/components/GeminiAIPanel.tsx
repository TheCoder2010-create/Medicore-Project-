import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Loader2, AlertTriangle, CheckCircle, FileText, Stethoscope, Pill as Pills, BookOpen, TrendingUp, Clock, Shield, Zap, MessageSquare, Sparkles, Eye, Activity, Search, Target } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { geminiService } from '../services/geminiService';

interface GeminiAIPanelProps {
  patientData?: {
    symptoms: string[];
    vitals: Record<string, any>;
    medications: string[];
    history?: string;
    chiefComplaint?: string;
    labResults?: Record<string, any>;
    imagingResults?: string[];
  };
  onInsightsGenerated?: (insights: any) => void;
}

const GeminiAIPanel: React.FC<GeminiAIPanelProps> = ({ 
  patientData, 
  onInsightsGenerated 
}) => {
  const [activeTab, setActiveTab] = useState('reasoning');
  const [isLoading, setIsLoading] = useState(false);
  const [clinicalReasoning, setClinicalReasoning] = useState<any>(null);
  const [researchInsights, setResearchInsights] = useState<any>(null);
  const [predictiveAnalytics, setPredictiveAnalytics] = useState<any>(null);
  const [treatmentOptimization, setTreatmentOptimization] = useState<any>(null);
  const [decisionSupport, setDecisionSupport] = useState<any>(null);
  const [populationHealth, setPopulationHealth] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'reasoning', label: 'Clinical Reasoning', icon: Brain },
    { id: 'research', label: 'Research Insights', icon: Search },
    { id: 'predictive', label: 'Predictive Analytics', icon: TrendingUp },
    { id: 'treatment', label: 'Treatment Optimization', icon: Target },
    { id: 'decision', label: 'Decision Support', icon: CheckCircle },
    { id: 'population', label: 'Population Health', icon: Activity }
  ];

  // Generate clinical reasoning when patient data changes
  useEffect(() => {
    if (patientData && patientData.symptoms.length > 0) {
      generateClinicalReasoning();
    }
  }, [patientData]);

  const generateClinicalReasoning = async () => {
    if (!patientData) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.performClinicalReasoning({
        symptoms: patientData.symptoms,
        vitals: patientData.vitals,
        medications: patientData.medications,
        history: patientData.history || '',
        labResults: patientData.labResults,
        imagingResults: patientData.imagingResults
      });
      setClinicalReasoning(result);
      onInsightsGenerated?.(result);
    } catch (err) {
      setError('Failed to generate clinical reasoning. Please try again.');
      console.error('Clinical reasoning error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResearchInsights = async () => {
    if (!patientData?.symptoms.length) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const primaryCondition = patientData.symptoms[0] || 'General Health';
      const result = await geminiService.generateResearchInsights(
        primaryCondition,
        patientData.medications
      );
      setResearchInsights(result);
    } catch (err) {
      setError('Failed to generate research insights.');
      console.error('Research insights error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePredictiveAnalytics = async () => {
    if (!patientData) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.generatePredictiveAnalytics({
        demographics: { age: 35, gender: 'female' }, // Mock data
        medicalHistory: patientData.history ? [patientData.history] : [],
        familyHistory: ['Hypertension', 'Diabetes'], // Mock data
        lifestyle: { smoking: false, exercise: 'moderate' }, // Mock data
        currentConditions: patientData.symptoms,
        medications: patientData.medications,
        labTrends: {} // Mock data
      });
      setPredictiveAnalytics(result);
    } catch (err) {
      setError('Failed to generate predictive analytics.');
      console.error('Predictive analytics error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTreatmentOptimization = async () => {
    if (!patientData) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.optimizeTreatmentPlan({
        condition: patientData.symptoms[0] || 'General condition',
        currentTreatments: patientData.medications,
        responseToTreatment: 'Stable',
        sideEffects: [],
        comorbidities: [],
        preferences: ['Oral medication preferred']
      });
      setTreatmentOptimization(result);
    } catch (err) {
      setError('Failed to generate treatment optimization.');
      console.error('Treatment optimization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDecisionSupport = async () => {
    if (!patientData) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.provideClinicalDecisionSupport({
        clinicalQuestion: `Best treatment approach for ${patientData.symptoms.join(', ')}`,
        patientContext: {
          symptoms: patientData.symptoms,
          vitals: patientData.vitals,
          medications: patientData.medications
        },
        availableOptions: ['Conservative management', 'Medication therapy', 'Specialist referral'],
        constraints: ['Patient preference', 'Insurance coverage'],
        urgency: 'medium'
      });
      setDecisionSupport(result);
    } catch (err) {
      setError('Failed to generate decision support.');
      console.error('Decision support error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePopulationHealth = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.generatePopulationHealthInsights({
        demographics: { averageAge: 45, primaryGender: 'mixed' },
        prevalentConditions: ['Hypertension', 'Diabetes', 'Obesity'],
        healthTrends: { hypertension: [15, 18, 22], diabetes: [8, 10, 12] },
        socialDeterminants: { income: 'middle', education: 'high school+' },
        interventionHistory: ['Wellness programs', 'Screening campaigns']
      });
      setPopulationHealth(result);
    } catch (err) {
      setError('Failed to generate population health insights.');
      console.error('Population health error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabAction = (tabId: string) => {
    setActiveTab(tabId);
    
    switch (tabId) {
      case 'reasoning':
        if (!clinicalReasoning) generateClinicalReasoning();
        break;
      case 'research':
        if (!researchInsights) generateResearchInsights();
        break;
      case 'predictive':
        if (!predictiveAnalytics) generatePredictiveAnalytics();
        break;
      case 'treatment':
        if (!treatmentOptimization) generateTreatmentOptimization();
        break;
      case 'decision':
        if (!decisionSupport) generateDecisionSupport();
        break;
      case 'population':
        if (!populationHealth) generatePopulationHealth();
        break;
    }
  };

  return (
    <Card className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Gemini 1.5 Pro</h3>
            <p className="text-sm text-gray-600">Advanced Medical AI Intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            Gemini Active
          </div>
          {isLoading && <Loader2 className="w-4 h-4 text-green-600 animate-spin" />}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center text-red-800">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabAction(tab.id)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'reasoning' && (
              <ClinicalReasoningTab 
                reasoning={clinicalReasoning} 
                isLoading={isLoading} 
                onRefresh={generateClinicalReasoning}
              />
            )}
            
            {activeTab === 'research' && (
              <ResearchInsightsTab 
                insights={researchInsights} 
                isLoading={isLoading} 
                onRefresh={generateResearchInsights}
              />
            )}
            
            {activeTab === 'predictive' && (
              <PredictiveAnalyticsTab 
                analytics={predictiveAnalytics} 
                isLoading={isLoading} 
                onRefresh={generatePredictiveAnalytics}
              />
            )}
            
            {activeTab === 'treatment' && (
              <TreatmentOptimizationTab 
                optimization={treatmentOptimization} 
                isLoading={isLoading} 
                onRefresh={generateTreatmentOptimization}
              />
            )}
            
            {activeTab === 'decision' && (
              <DecisionSupportTab 
                support={decisionSupport} 
                isLoading={isLoading} 
                onRefresh={generateDecisionSupport}
              />
            )}
            
            {activeTab === 'population' && (
              <PopulationHealthTab 
                health={populationHealth} 
                isLoading={isLoading} 
                onRefresh={generatePopulationHealth}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
};

// Individual tab components
const ClinicalReasoningTab: React.FC<{ reasoning: any; isLoading: boolean; onRefresh: () => void }> = ({ 
  reasoning, 
  isLoading, 
  onRefresh 
}) => {
  if (isLoading) {
    return <LoadingState message="Performing advanced clinical reasoning..." />;
  }

  if (!reasoning) {
    return (
      <EmptyState 
        icon={Brain}
        title="Advanced Clinical Reasoning"
        description="Multi-modal analysis combining symptoms, vitals, lab results, and imaging"
        action={<Button onClick={onRefresh} icon={Brain}>Generate Reasoning</Button>}
      />
    );
  }

  return (
    <div className="space-y-4">
      <InsightCard
        title="Clinical Reasoning Process"
        content={reasoning.reasoningProcess}
        icon={Brain}
        color="blue"
      />
      
      <InsightCard
        title="Differential Diagnosis"
        content={reasoning.differentialDiagnosis}
        icon={Stethoscope}
        color="green"
      />
      
      <InsightCard
        title="Risk Stratification"
        content={reasoning.riskStratification}
        icon={AlertTriangle}
        color="yellow"
      />
      
      <InsightCard
        title="Treatment Recommendations"
        content={reasoning.treatmentRecommendations}
        icon={Pills}
        color="purple"
      />
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-600">
          <Shield className="w-4 h-4 mr-2" />
          Confidence: {(reasoning.confidence * 100).toFixed(0)}%
        </div>
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          Refresh Analysis
        </Button>
      </div>
    </div>
  );
};

const ResearchInsightsTab: React.FC<{ insights: any; isLoading: boolean; onRefresh: () => void }> = ({ 
  insights, 
  isLoading, 
  onRefresh 
}) => {
  if (isLoading) {
    return <LoadingState message="Analyzing latest medical research..." />;
  }

  if (!insights) {
    return (
      <EmptyState 
        icon={Search}
        title="Medical Research Insights"
        description="Latest research developments, clinical trials, and emerging treatments"
        action={<Button onClick={onRefresh} icon={Search}>Generate Insights</Button>}
      />
    );
  }

  return (
    <div className="space-y-4">
      <InsightCard
        title="Latest Research"
        content={insights.latestResearch}
        icon={BookOpen}
        color="blue"
      />
      
      <InsightCard
        title="Emerging Treatments"
        content={insights.emergingTreatments}
        icon={Zap}
        color="green"
      />
      
      <InsightCard
        title="Clinical Trials"
        content={insights.clinicalTrials}
        icon={FileText}
        color="purple"
      />
      
      <InsightCard
        title="Precision Medicine"
        content={insights.precisionMedicine}
        icon={Target}
        color="orange"
      />
    </div>
  );
};

const PredictiveAnalyticsTab: React.FC<{ analytics: any; isLoading: boolean; onRefresh: () => void }> = ({ 
  analytics, 
  isLoading, 
  onRefresh 
}) => {
  if (isLoading) {
    return <LoadingState message="Generating predictive health analytics..." />;
  }

  if (!analytics) {
    return (
      <EmptyState 
        icon={TrendingUp}
        title="Predictive Health Analytics"
        description="Risk predictions, disease progression modeling, and preventive recommendations"
        action={<Button onClick={onRefresh} icon={TrendingUp}>Generate Analytics</Button>}
      />
    );
  }

  return (
    <div className="space-y-4">
      <InsightCard
        title="Risk Predictions"
        content={analytics.riskPredictions}
        icon={AlertTriangle}
        color="red"
      />
      
      <InsightCard
        title="Disease Progression"
        content={analytics.diseaseProgression}
        icon={TrendingUp}
        color="blue"
      />
      
      <InsightCard
        title="Preventive Interventions"
        content={analytics.preventiveInterventions}
        icon={Shield}
        color="green"
      />
      
      <InsightCard
        title="Screening Recommendations"
        content={analytics.screeningRecommendations}
        icon={Eye}
        color="purple"
      />
    </div>
  );
};

const TreatmentOptimizationTab: React.FC<{ optimization: any; isLoading: boolean; onRefresh: () => void }> = ({ 
  optimization, 
  isLoading, 
  onRefresh 
}) => {
  if (isLoading) {
    return <LoadingState message="Optimizing treatment plan..." />;
  }

  if (!optimization) {
    return (
      <EmptyState 
        icon={Target}
        title="Treatment Optimization"
        description="Personalized treatment strategies and precision medicine approaches"
        action={<Button onClick={onRefresh} icon={Target}>Optimize Treatment</Button>}
      />
    );
  }

  return (
    <div className="space-y-4">
      <InsightCard
        title="Optimization Strategies"
        content={optimization.optimizationStrategies}
        icon={Target}
        color="blue"
      />
      
      <InsightCard
        title="Side Effect Mitigation"
        content={optimization.sideEffectMitigation}
        icon={Shield}
        color="green"
      />
      
      <InsightCard
        title="Alternative Treatments"
        content={optimization.alternativeTreatments}
        icon={Pills}
        color="purple"
      />
      
      <InsightCard
        title="Patient-Centered Care"
        content={optimization.patientCenteredCare}
        icon={CheckCircle}
        color="orange"
      />
    </div>
  );
};

const DecisionSupportTab: React.FC<{ support: any; isLoading: boolean; onRefresh: () => void }> = ({ 
  support, 
  isLoading, 
  onRefresh 
}) => {
  if (isLoading) {
    return <LoadingState message="Analyzing clinical decision options..." />;
  }

  if (!support) {
    return (
      <EmptyState 
        icon={CheckCircle}
        title="Clinical Decision Support"
        description="Evidence-based decision analysis with uncertainty quantification"
        action={<Button onClick={onRefresh} icon={CheckCircle}>Generate Support</Button>}
      />
    );
  }

  return (
    <div className="space-y-4">
      <InsightCard
        title="Decision Analysis"
        content={support.decisionAnalysis}
        icon={Brain}
        color="blue"
      />
      
      <InsightCard
        title="Risk-Benefit Assessment"
        content={support.riskBenefitAssessment}
        icon={AlertTriangle}
        color="yellow"
      />
      
      <InsightCard
        title="Recommended Pathway"
        content={support.recommendedPathway}
        icon={CheckCircle}
        color="green"
      />
      
      <InsightCard
        title="Shared Decision Making"
        content={support.sharedDecisionMaking}
        icon={MessageSquare}
        color="purple"
      />
    </div>
  );
};

const PopulationHealthTab: React.FC<{ health: any; isLoading: boolean; onRefresh: () => void }> = ({ 
  health, 
  isLoading, 
  onRefresh 
}) => {
  if (isLoading) {
    return <LoadingState message="Analyzing population health data..." />;
  }

  if (!health) {
    return (
      <EmptyState 
        icon={Activity}
        title="Population Health Insights"
        description="Community health analysis and public health strategy recommendations"
        action={<Button onClick={onRefresh} icon={Activity}>Generate Insights</Button>}
      />
    );
  }

  return (
    <div className="space-y-4">
      <InsightCard
        title="Risk Assessment"
        content={health.riskAssessment}
        icon={AlertTriangle}
        color="red"
      />
      
      <InsightCard
        title="Health Disparities"
        content={health.healthDisparities}
        icon={Activity}
        color="blue"
      />
      
      <InsightCard
        title="Intervention Effectiveness"
        content={health.interventionEffectiveness}
        icon={TrendingUp}
        color="green"
      />
      
      <InsightCard
        title="Public Health Strategy"
        content={health.publicHealthStrategy}
        icon={Shield}
        color="purple"
      />
    </div>
  );
};

// Helper components
const InsightCard: React.FC<{
  title: string;
  content: string;
  icon: React.ComponentType<any>;
  color: string;
}> = ({ title, content, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    red: 'bg-red-50 border-red-200 text-red-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800'
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center mb-2">
        <Icon className="w-4 h-4 mr-2" />
        <h5 className="font-medium">{title}</h5>
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-line">{content}</p>
    </div>
  );
};

const LoadingState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader2 className="w-8 h-8 text-green-600 animate-spin mb-4" />
    <p className="text-gray-600">{message}</p>
  </div>
);

const EmptyState: React.FC<{
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  action: React.ReactNode;
}> = ({ icon: Icon, title, description, action }) => (
  <div className="text-center py-12">
    <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h4 className="text-lg font-medium text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600 mb-6 max-w-sm mx-auto">{description}</p>
    {action}
  </div>
);

export default GeminiAIPanel;