import { GoogleGenerativeAI } from '@google/generative-ai';

// Google Gemini service for advanced medical AI capabilities
class GeminiService {
  private genAI: GoogleGenerativeAI;
  private readonly model = 'gemini-1.5-pro';

  constructor() {
    // Initialize Gemini AI with the provided API key
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDWqQx6dXwdk9ztZ48wpKyHZ2sog-5eUQs';
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  // Advanced medical image analysis
  async analyzeMedicalImage(imageData: string, imageType: 'xray' | 'mri' | 'ct' | 'ultrasound' | 'dermatology') {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.model });
      const prompt = this.buildImageAnalysisPrompt(imageType);
      
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageData,
            mimeType: 'image/jpeg'
          }
        }
      ]);

      const response = await result.response;
      return this.parseImageAnalysisResponse(response.text());
    } catch (error) {
      console.error('Gemini Image Analysis Error:', error);
      return this.getFallbackImageAnalysis();
    }
  }

  // Multi-modal clinical reasoning
  async performClinicalReasoning(patientData: {
    symptoms: string[];
    vitals: Record<string, any>;
    labResults?: Record<string, any>;
    imagingResults?: string[];
    medications: string[];
    history: string;
  }) {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: 0.3,
          topP: 0.9,
          maxOutputTokens: 3000,
        }
      });

      const prompt = this.buildClinicalReasoningPrompt(patientData);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return this.parseClinicalReasoningResponse(response.text());
    } catch (error) {
      console.error('Gemini Clinical Reasoning Error:', error);
      // Return fallback response instead of throwing the error
      return this.getFallbackClinicalReasoning();
    }
  }

  // Advanced drug discovery and research insights
  async generateResearchInsights(condition: string, currentTreatments: string[]) {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: 0.4,
          topP: 0.9,
          maxOutputTokens: 2500,
        }
      });

      const prompt = `
        As an advanced medical research AI, provide comprehensive research insights for:
        
        Condition: ${condition}
        Current Treatments: ${currentTreatments.join(', ')}
        
        Please provide:
        1. Latest research developments and clinical trials
        2. Emerging treatment modalities
        3. Novel therapeutic targets
        4. Precision medicine approaches
        5. Biomarker discoveries
        6. Future treatment directions
        7. Clinical trial opportunities for patients
        
        Base your analysis on the most recent medical literature and research databases.
        Include confidence levels and evidence quality assessments.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return this.parseResearchInsightsResponse(response.text());
    } catch (error) {
      console.error('Gemini Research Insights Error:', error);
      return this.getFallbackResearchInsights();
    }
  }

  // Predictive health analytics
  async generatePredictiveAnalytics(patientHistory: {
    demographics: Record<string, any>;
    medicalHistory: string[];
    familyHistory: string[];
    lifestyle: Record<string, any>;
    currentConditions: string[];
    medications: string[];
    labTrends: Record<string, number[]>;
  }) {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          maxOutputTokens: 2000,
        }
      });

      const prompt = this.buildPredictiveAnalyticsPrompt(patientHistory);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return this.parsePredictiveAnalyticsResponse(response.text());
    } catch (error) {
      console.error('Gemini Predictive Analytics Error:', error);
      return this.getFallbackPredictiveAnalytics();
    }
  }

  // Advanced treatment optimization
  async optimizeTreatmentPlan(patientProfile: {
    condition: string;
    currentTreatments: string[];
    responseToTreatment: string;
    sideEffects: string[];
    comorbidities: string[];
    preferences: string[];
    geneticFactors?: string[];
  }) {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: 0.3,
          topP: 0.9,
          maxOutputTokens: 2500,
        }
      });

      const prompt = this.buildTreatmentOptimizationPrompt(patientProfile);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return this.parseTreatmentOptimizationResponse(response.text());
    } catch (error) {
      console.error('Gemini Treatment Optimization Error:', error);
      return this.getFallbackTreatmentOptimization();
    }
  }

  // Clinical decision support with uncertainty quantification
  async provideClinicalDecisionSupport(scenario: {
    clinicalQuestion: string;
    patientContext: Record<string, any>;
    availableOptions: string[];
    constraints: string[];
    urgency: 'low' | 'medium' | 'high' | 'critical';
  }) {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          maxOutputTokens: 2000,
        }
      });

      const prompt = this.buildDecisionSupportPrompt(scenario);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return this.parseDecisionSupportResponse(response.text());
    } catch (error) {
      console.error('Gemini Decision Support Error:', error);
      return this.getFallbackDecisionSupport();
    }
  }

  // Population health insights
  async generatePopulationHealthInsights(populationData: {
    demographics: Record<string, any>;
    prevalentConditions: string[];
    healthTrends: Record<string, number[]>;
    socialDeterminants: Record<string, any>;
    interventionHistory: string[];
  }) {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: 0.4,
          topP: 0.9,
          maxOutputTokens: 2500,
        }
      });

      const prompt = this.buildPopulationHealthPrompt(populationData);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return this.parsePopulationHealthResponse(response.text());
    } catch (error) {
      console.error('Gemini Population Health Error:', error);
      return this.getFallbackPopulationHealth();
    }
  }

  // Private helper methods for building prompts
  private buildImageAnalysisPrompt(imageType: string): string {
    const typeSpecificInstructions = {
      xray: 'Focus on bone structures, lung fields, cardiac silhouette, and any abnormal findings',
      mri: 'Analyze soft tissue contrast, anatomical structures, and pathological changes',
      ct: 'Examine cross-sectional anatomy, density variations, and contrast enhancement patterns',
      ultrasound: 'Evaluate echogenicity, anatomical landmarks, and dynamic findings',
      dermatology: 'Assess skin lesions, morphology, color patterns, and concerning features'
    };

    return `
      As an expert radiologist AI, analyze this ${imageType} image and provide:
      
      1. Detailed findings description
      2. Normal vs abnormal structures identification
      3. Differential diagnosis considerations
      4. Recommended follow-up imaging if needed
      5. Clinical correlation suggestions
      6. Urgency level assessment
      
      ${typeSpecificInstructions[imageType]}
      
      Provide confidence levels for each finding and highlight any critical findings that require immediate attention.
      Use standard medical terminology and follow ACR reporting guidelines.
    `;
  }

  private buildClinicalReasoningPrompt(patientData: any): string {
    return `
      Perform advanced clinical reasoning for this complex patient case:
      
      Patient Data:
      - Symptoms: ${patientData.symptoms.join(', ')}
      - Vital Signs: ${JSON.stringify(patientData.vitals)}
      - Lab Results: ${JSON.stringify(patientData.labResults || {})}
      - Imaging: ${patientData.imagingResults?.join(', ') || 'None'}
      - Medications: ${patientData.medications.join(', ')}
      - Medical History: ${patientData.history}
      
      Provide comprehensive analysis including:
      1. Systematic clinical reasoning process
      2. Differential diagnosis with probability weighting
      3. Critical thinking about diagnostic uncertainty
      4. Risk stratification and prognosis
      5. Evidence-based treatment recommendations
      6. Monitoring and follow-up strategies
      7. Patient safety considerations
      
      Use Bayesian reasoning and consider diagnostic test characteristics.
    `;
  }

  private buildPredictiveAnalyticsPrompt(patientHistory: any): string {
    return `
      Generate predictive health analytics for this patient:
      
      Demographics: ${JSON.stringify(patientHistory.demographics)}
      Medical History: ${patientHistory.medicalHistory.join(', ')}
      Family History: ${patientHistory.familyHistory.join(', ')}
      Lifestyle Factors: ${JSON.stringify(patientHistory.lifestyle)}
      Current Conditions: ${patientHistory.currentConditions.join(', ')}
      Lab Trends: ${JSON.stringify(patientHistory.labTrends)}
      
      Provide:
      1. Risk predictions for major health events (1, 5, 10 year)
      2. Disease progression modeling
      3. Preventive intervention recommendations
      4. Personalized screening schedules
      5. Lifestyle modification impact projections
      6. Medication adherence predictions
      7. Healthcare utilization forecasts
      
      Include confidence intervals and model limitations.
    `;
  }

  private buildTreatmentOptimizationPrompt(patientProfile: any): string {
    return `
      Optimize treatment plan for this patient profile:
      
      Condition: ${patientProfile.condition}
      Current Treatments: ${patientProfile.currentTreatments.join(', ')}
      Treatment Response: ${patientProfile.responseToTreatment}
      Side Effects: ${patientProfile.sideEffects.join(', ')}
      Comorbidities: ${patientProfile.comorbidities.join(', ')}
      Patient Preferences: ${patientProfile.preferences.join(', ')}
      Genetic Factors: ${patientProfile.geneticFactors?.join(', ') || 'Unknown'}
      
      Provide:
      1. Treatment efficacy optimization strategies
      2. Side effect mitigation approaches
      3. Personalized dosing recommendations
      4. Alternative treatment options
      5. Combination therapy considerations
      6. Monitoring parameter adjustments
      7. Patient-centered care modifications
      
      Consider pharmacogenomics and precision medicine principles.
    `;
  }

  private buildDecisionSupportPrompt(scenario: any): string {
    return `
      Provide clinical decision support for this scenario:
      
      Clinical Question: ${scenario.clinicalQuestion}
      Patient Context: ${JSON.stringify(scenario.patientContext)}
      Available Options: ${scenario.availableOptions.join(', ')}
      Constraints: ${scenario.constraints.join(', ')}
      Urgency Level: ${scenario.urgency}
      
      Provide:
      1. Structured decision analysis
      2. Risk-benefit assessment for each option
      3. Evidence quality evaluation
      4. Uncertainty quantification
      5. Recommended decision pathway
      6. Contingency planning
      7. Shared decision-making considerations
      
      Use decision science principles and clinical guidelines.
    `;
  }

  private buildPopulationHealthPrompt(populationData: any): string {
    return `
      Analyze population health data and provide insights:
      
      Demographics: ${JSON.stringify(populationData.demographics)}
      Prevalent Conditions: ${populationData.prevalentConditions.join(', ')}
      Health Trends: ${JSON.stringify(populationData.healthTrends)}
      Social Determinants: ${JSON.stringify(populationData.socialDeterminants)}
      Intervention History: ${populationData.interventionHistory.join(', ')}
      
      Provide:
      1. Population health risk assessment
      2. Health disparity analysis
      3. Intervention effectiveness evaluation
      4. Resource allocation recommendations
      5. Public health strategy suggestions
      6. Outcome prediction modeling
      7. Health equity considerations
      
      Focus on actionable insights for population health management.
    `;
  }

  // Response parsing methods
  private parseImageAnalysisResponse(response: string) {
    return {
      findings: this.extractSection(response, 'findings'),
      normalStructures: this.extractSection(response, 'normal'),
      abnormalFindings: this.extractSection(response, 'abnormal'),
      differentialDiagnosis: this.extractSection(response, 'differential'),
      recommendations: this.extractSection(response, 'recommend'),
      urgency: this.extractSection(response, 'urgency'),
      confidence: this.extractConfidence(response),
      rawResponse: response
    };
  }

  private parseClinicalReasoningResponse(response: string) {
    return {
      reasoningProcess: this.extractSection(response, 'reasoning'),
      differentialDiagnosis: this.extractSection(response, 'differential'),
      riskStratification: this.extractSection(response, 'risk'),
      treatmentRecommendations: this.extractSection(response, 'treatment'),
      monitoring: this.extractSection(response, 'monitoring'),
      safetyConsiderations: this.extractSection(response, 'safety'),
      confidence: this.extractConfidence(response),
      rawResponse: response
    };
  }

  private parseResearchInsightsResponse(response: string) {
    return {
      latestResearch: this.extractSection(response, 'research'),
      emergingTreatments: this.extractSection(response, 'emerging'),
      clinicalTrials: this.extractSection(response, 'trials'),
      precisionMedicine: this.extractSection(response, 'precision'),
      futureDirections: this.extractSection(response, 'future'),
      evidenceQuality: this.extractSection(response, 'evidence'),
      rawResponse: response
    };
  }

  private parsePredictiveAnalyticsResponse(response: string) {
    return {
      riskPredictions: this.extractSection(response, 'risk'),
      diseaseProgression: this.extractSection(response, 'progression'),
      preventiveInterventions: this.extractSection(response, 'preventive'),
      screeningRecommendations: this.extractSection(response, 'screening'),
      lifestyleImpact: this.extractSection(response, 'lifestyle'),
      confidenceIntervals: this.extractSection(response, 'confidence'),
      rawResponse: response
    };
  }

  private parseTreatmentOptimizationResponse(response: string) {
    return {
      optimizationStrategies: this.extractSection(response, 'optimization'),
      sideEffectMitigation: this.extractSection(response, 'side effect'),
      alternativeTreatments: this.extractSection(response, 'alternative'),
      personalizationFactors: this.extractSection(response, 'personalization'),
      monitoringAdjustments: this.extractSection(response, 'monitoring'),
      patientCenteredCare: this.extractSection(response, 'patient-centered'),
      rawResponse: response
    };
  }

  private parseDecisionSupportResponse(response: string) {
    return {
      decisionAnalysis: this.extractSection(response, 'decision'),
      riskBenefitAssessment: this.extractSection(response, 'risk-benefit'),
      recommendedPathway: this.extractSection(response, 'recommended'),
      uncertaintyQuantification: this.extractSection(response, 'uncertainty'),
      contingencyPlanning: this.extractSection(response, 'contingency'),
      sharedDecisionMaking: this.extractSection(response, 'shared'),
      rawResponse: response
    };
  }

  private parsePopulationHealthResponse(response: string) {
    return {
      riskAssessment: this.extractSection(response, 'risk'),
      healthDisparities: this.extractSection(response, 'disparity'),
      interventionEffectiveness: this.extractSection(response, 'intervention'),
      resourceAllocation: this.extractSection(response, 'resource'),
      publicHealthStrategy: this.extractSection(response, 'strategy'),
      outcomeModeling: this.extractSection(response, 'outcome'),
      rawResponse: response
    };
  }

  // Utility methods
  private extractSection(text: string, keyword: string): string {
    const lines = text.split('\n');
    const sectionStart = lines.findIndex(line => 
      line.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (sectionStart === -1) return '';
    
    const sectionEnd = lines.findIndex((line, index) => 
      index > sectionStart && line.match(/^\d+\./) && !line.toLowerCase().includes(keyword.toLowerCase())
    );
    
    const endIndex = sectionEnd === -1 ? lines.length : sectionEnd;
    return lines.slice(sectionStart, endIndex).join('\n').trim();
  }

  private extractConfidence(text: string): number {
    const confidenceMatch = text.match(/confidence[:\s]*(\d+)%/i);
    return confidenceMatch ? parseInt(confidenceMatch[1]) / 100 : 0.8;
  }

  // Fallback methods
  private getFallbackImageAnalysis() {
    return {
      findings: 'Image analysis temporarily unavailable due to API quota limits. Please try again later or contact support for API key assistance.',
      normalStructures: 'Manual review required',
      abnormalFindings: 'Please consult radiologist',
      differentialDiagnosis: 'Clinical correlation needed',
      recommendations: 'Standard imaging protocols apply',
      urgency: 'Manual assessment required',
      confidence: 0.0,
      rawResponse: 'Fallback response - Gemini API quota exceeded'
    };
  }

  private getFallbackClinicalReasoning() {
    return {
      reasoningProcess: 'Clinical reasoning analysis temporarily unavailable due to API quota limits. The system will continue to function with standard clinical protocols.',
      differentialDiagnosis: 'Standard differential diagnosis protocols should be followed. Consider common conditions first, then rare diagnoses.',
      riskStratification: 'Manual risk assessment needed. Use established clinical risk calculators and guidelines.',
      treatmentRecommendations: 'Follow evidence-based clinical guidelines and institutional protocols.',
      monitoring: 'Standard monitoring protocols apply. Regular follow-up as per clinical guidelines.',
      safetyConsiderations: 'Review safety protocols manually. Ensure patient safety measures are in place.',
      confidence: 0.0,
      rawResponse: 'Fallback response - Gemini API quota exceeded. Please check your API key and billing status.'
    };
  }

  private getFallbackResearchInsights() {
    return {
      latestResearch: 'Research insights temporarily unavailable due to API quota limits. Please consult PubMed and medical databases directly.',
      emergingTreatments: 'Consult medical literature and clinical guidelines for current treatment options.',
      clinicalTrials: 'Check ClinicalTrials.gov for ongoing studies and trial opportunities.',
      precisionMedicine: 'Standard treatment protocols apply. Consider genetic testing if clinically indicated.',
      futureDirections: 'Follow established clinical guidelines and stay updated with medical literature.',
      evidenceQuality: 'Manual evidence review required. Use systematic reviews and meta-analyses.',
      rawResponse: 'Fallback response - Gemini API quota exceeded'
    };
  }

  private getFallbackPredictiveAnalytics() {
    return {
      riskPredictions: 'Predictive analytics temporarily unavailable due to API quota limits. Use established risk calculators and clinical assessment tools.',
      diseaseProgression: 'Standard progression models apply. Refer to clinical guidelines for disease trajectory.',
      preventiveInterventions: 'Follow evidence-based prevention guidelines and screening recommendations.',
      screeningRecommendations: 'Standard screening protocols based on age, risk factors, and guidelines.',
      lifestyleImpact: 'General lifestyle recommendations: healthy diet, regular exercise, smoking cessation.',
      confidenceIntervals: 'Statistical analysis required. Use appropriate clinical decision tools.',
      rawResponse: 'Fallback response - Gemini API quota exceeded'
    };
  }

  private getFallbackTreatmentOptimization() {
    return {
      optimizationStrategies: 'Treatment optimization temporarily unavailable due to API quota limits. Follow clinical guidelines and consider patient-specific factors.',
      sideEffectMitigation: 'Standard mitigation protocols apply. Monitor for adverse effects and adjust as needed.',
      alternativeTreatments: 'Consult treatment guidelines and consider alternative therapeutic options.',
      personalizationFactors: 'Individual assessment needed. Consider patient preferences, comorbidities, and contraindications.',
      monitoringAdjustments: 'Standard monitoring protocols apply. Regular assessment and dose adjustments as clinically indicated.',
      patientCenteredCare: 'Patient preference assessment required. Engage in shared decision-making.',
      rawResponse: 'Fallback response - Gemini API quota exceeded'
    };
  }

  private getFallbackDecisionSupport() {
    return {
      decisionAnalysis: 'Clinical decision support temporarily unavailable due to API quota limits. Use clinical judgment and established decision-making frameworks.',
      riskBenefitAssessment: 'Standard risk-benefit evaluation required. Consider all relevant factors and patient preferences.',
      recommendedPathway: 'Follow clinical guidelines and institutional protocols for decision-making.',
      uncertaintyQuantification: 'Clinical judgment required. Acknowledge uncertainty and consider multiple scenarios.',
      contingencyPlanning: 'Standard contingency protocols apply. Plan for various outcomes and complications.',
      sharedDecisionMaking: 'Patient discussion recommended. Involve patient in treatment decisions.',
      rawResponse: 'Fallback response - Gemini API quota exceeded'
    };
  }

  private getFallbackPopulationHealth() {
    return {
      riskAssessment: 'Population health analysis temporarily unavailable due to API quota limits. Use epidemiological data and public health resources.',
      healthDisparities: 'Manual disparity analysis required. Consider social determinants of health.',
      interventionEffectiveness: 'Standard evaluation methods apply. Use evidence-based public health interventions.',
      resourceAllocation: 'Manual resource planning needed. Consider population needs and available resources.',
      publicHealthStrategy: 'Follow public health guidelines and evidence-based interventions.',
      outcomeModeling: 'Statistical modeling required. Use appropriate epidemiological methods.',
      rawResponse: 'Fallback response - Gemini API quota exceeded'
    };
  }
}

export const geminiService = new GeminiService();
export default geminiService;