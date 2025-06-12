import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  ArrowRight, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import toast from 'react-hot-toast';
import { useFirebaseAuth } from '../../contexts/FirebaseAuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface PhoneFormData {
  phoneNumber: string;
}

interface VerificationFormData {
  verificationCode: string;
}

const FirebaseAuth: React.FC = () => {
  const navigate = useNavigate();
  const { 
    signInWithGoogle, 
    sendPhoneVerification, 
    verifyPhoneCode, 
    loading, 
    error, 
    clearError 
  } = useFirebaseAuth();

  const [authMethod, setAuthMethod] = useState<'select' | 'google' | 'phone' | 'verify'>('select');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showVerificationHelp, setShowVerificationHelp] = useState(false);

  const phoneForm = useForm<PhoneFormData>();
  const verificationForm = useForm<VerificationFormData>();

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      clearError();
      await signInWithGoogle();
      toast.success('Successfully signed in with Google!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Handle Phone Number Submission
  const handlePhoneSubmit = async (data: PhoneFormData) => {
    try {
      clearError();
      
      // Validate phone number
      if (!isValidPhoneNumber(data.phoneNumber)) {
        toast.error('Please enter a valid phone number');
        return;
      }

      const result = await sendPhoneVerification(data.phoneNumber);
      setConfirmationResult(result.confirmationResult);
      setPhoneNumber(data.phoneNumber);
      setAuthMethod('verify');
      toast.success('Verification code sent to your phone!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Handle Verification Code Submission
  const handleVerificationSubmit = async (data: VerificationFormData) => {
    try {
      clearError();
      
      if (!confirmationResult) {
        toast.error('Please request a new verification code');
        return;
      }

      await verifyPhoneCode(confirmationResult, data.verificationCode);
      toast.success('Phone number verified successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Format phone number for display
  const formatPhoneDisplay = (phone: string) => {
    try {
      const parsed = parsePhoneNumber(phone);
      return parsed?.formatInternational() || phone;
    } catch {
      return phone;
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    try {
      clearError();
      const result = await sendPhoneVerification(phoneNumber);
      setConfirmationResult(result.confirmationResult);
      toast.success('New verification code sent!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome to MediCore AI</h2>
          <p className="mt-2 text-gray-600">Sign in to access your medical dashboard</p>
        </div>

        <Card>
          <AnimatePresence mode="wait">
            {/* Method Selection */}
            {authMethod === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
                  Choose your sign-in method
                </h3>

                {/* Google Sign In */}
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                  size="lg"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                {/* Phone Sign In */}
                <Button
                  onClick={() => setAuthMethod('phone')}
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-3"
                  size="lg"
                >
                  <Phone className="w-5 h-5" />
                  <span>Continue with Phone Number</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Secure Authentication</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your data is protected with enterprise-grade security and HIPAA compliance.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Phone Number Input */}
            {authMethod === 'phone' && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <button
                    onClick={() => setAuthMethod('select')}
                    className="p-2 rounded-lg hover:bg-gray-100 mr-3"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Enter your phone number
                  </h3>
                </div>

                <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-6">
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    leftIcon={<Phone />}
                    error={phoneForm.formState.errors.phoneNumber?.message}
                    {...phoneForm.register('phoneNumber', {
                      required: 'Phone number is required',
                      validate: (value) => {
                        if (!isValidPhoneNumber(value)) {
                          return 'Please enter a valid phone number with country code';
                        }
                        return true;
                      }
                    })}
                  />

                  <div className="text-sm text-gray-600">
                    <p>We'll send you a verification code via SMS.</p>
                    <p className="mt-1">Standard messaging rates may apply.</p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    loading={loading}
                    disabled={loading}
                    size="lg"
                  >
                    Send Verification Code
                  </Button>
                </form>
              </motion.div>
            )}

            {/* Verification Code Input */}
            {authMethod === 'verify' && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <button
                    onClick={() => setAuthMethod('phone')}
                    className="p-2 rounded-lg hover:bg-gray-100 mr-3"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Verify your phone
                  </h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-center text-gray-600">
                    We sent a verification code to
                  </p>
                  <p className="text-center font-medium text-gray-900">
                    {formatPhoneDisplay(phoneNumber)}
                  </p>
                </div>

                <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)} className="space-y-6">
                  <Input
                    label="Verification Code"
                    type="text"
                    placeholder="123456"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                    error={verificationForm.formState.errors.verificationCode?.message}
                    {...verificationForm.register('verificationCode', {
                      required: 'Verification code is required',
                      pattern: {
                        value: /^\d{6}$/,
                        message: 'Please enter a 6-digit code'
                      }
                    })}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    loading={loading}
                    disabled={loading}
                    size="lg"
                  >
                    Verify Phone Number
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={loading}
                      className="text-blue-600 hover:text-blue-500 text-sm font-medium disabled:opacity-50"
                    >
                      Didn't receive the code? Resend
                    </button>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setShowVerificationHelp(!showVerificationHelp)}
                      className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
                    >
                      {showVerificationHelp ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                      {showVerificationHelp ? 'Hide' : 'Show'} help
                    </button>
                  </div>

                  {showVerificationHelp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">Verification Help:</h4>
                      <ul className="space-y-1">
                        <li>• Check your SMS messages for a 6-digit code</li>
                        <li>• The code expires in 5 minutes</li>
                        <li>• Make sure your phone has signal</li>
                        <li>• Check spam/blocked messages if needed</li>
                      </ul>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center text-red-800">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            </motion.div>
          )}
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
          </p>
        </div>

        {/* reCAPTCHA container (invisible) */}
        <div id="recaptcha-container"></div>
      </motion.div>
    </div>
  );
};

export default FirebaseAuth;