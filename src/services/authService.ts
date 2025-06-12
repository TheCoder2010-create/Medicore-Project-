import { 
  signInWithPopup, 
  signInWithPhoneNumber, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  ConfirmationResult,
  RecaptchaVerifier,
  AuthError
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db, setupRecaptcha } from '../config/firebase';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt?: any;
  lastLoginAt?: any;
  authProvider: 'google' | 'phone';
}

export interface PhoneAuthResult {
  confirmationResult: ConfirmationResult;
  verificationId: string;
}

class AuthService {
  private recaptchaVerifier: RecaptchaVerifier | null = null;

  // Initialize auth state listener
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const user = await this.createUserProfile(firebaseUser);
        callback(user);
      } else {
        callback(null);
      }
    });
  }

  // Google OAuth Sign In
  async signInWithGoogle(): Promise<AuthUser> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = await this.createUserProfile(result.user, 'google');
      return user;
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  // Phone Number Authentication - Step 1: Send SMS
  async sendPhoneVerification(phoneNumber: string): Promise<PhoneAuthResult> {
    try {
      // Validate phone number format
      if (!this.validatePhoneNumber(phoneNumber)) {
        throw new Error('Invalid phone number format');
      }

      // Format phone number to E.164 format
      const formattedPhone = this.formatPhoneNumber(phoneNumber);

      // Setup reCAPTCHA
      if (!this.recaptchaVerifier) {
        this.recaptchaVerifier = setupRecaptcha('recaptcha-container');
      }

      // Send verification code
      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        formattedPhone, 
        this.recaptchaVerifier
      );

      return {
        confirmationResult,
        verificationId: confirmationResult.verificationId
      };
    } catch (error) {
      // Reset reCAPTCHA on error
      this.resetRecaptcha();
      throw this.handleAuthError(error as AuthError);
    }
  }

  // Phone Number Authentication - Step 2: Verify SMS Code
  async verifyPhoneCode(confirmationResult: ConfirmationResult, code: string): Promise<AuthUser> {
    try {
      const result = await confirmationResult.confirm(code);
      const user = await this.createUserProfile(result.user, 'phone');
      this.resetRecaptcha();
      return user;
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  // Sign Out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
      this.resetRecaptcha();
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  // Get current user
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  // Create or update user profile in Firestore
  private async createUserProfile(firebaseUser: FirebaseUser, authProvider?: 'google' | 'phone'): Promise<AuthUser> {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    const userData: AuthUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      phoneNumber: firebaseUser.phoneNumber,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      authProvider: authProvider || (firebaseUser.phoneNumber ? 'phone' : 'google'),
      lastLoginAt: serverTimestamp()
    };

    if (!userSnap.exists()) {
      // Create new user document
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp()
      });
    } else {
      // Update existing user document
      await setDoc(userRef, userData, { merge: true });
    }

    return userData;
  }

  // Validate phone number
  private validatePhoneNumber(phoneNumber: string): boolean {
    try {
      return isValidPhoneNumber(phoneNumber);
    } catch {
      return false;
    }
  }

  // Format phone number to E.164 format
  private formatPhoneNumber(phoneNumber: string): string {
    try {
      const parsed = parsePhoneNumber(phoneNumber);
      return parsed?.format('E.164') || phoneNumber;
    } catch {
      return phoneNumber;
    }
  }

  // Reset reCAPTCHA verifier
  private resetRecaptcha(): void {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
      this.recaptchaVerifier = null;
    }
  }

  // Handle authentication errors
  private handleAuthError(error: AuthError): Error {
    let message = 'An authentication error occurred';

    switch (error.code) {
      case 'auth/user-disabled':
        message = 'This account has been disabled';
        break;
      case 'auth/user-not-found':
        message = 'No account found with this information';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password';
        break;
      case 'auth/email-already-in-use':
        message = 'An account with this email already exists';
        break;
      case 'auth/weak-password':
        message = 'Password is too weak';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email address';
        break;
      case 'auth/operation-not-allowed':
        message = 'This sign-in method is not enabled';
        break;
      case 'auth/account-exists-with-different-credential':
        message = 'An account already exists with the same email but different sign-in credentials';
        break;
      case 'auth/invalid-phone-number':
        message = 'Invalid phone number format';
        break;
      case 'auth/missing-phone-number':
        message = 'Phone number is required';
        break;
      case 'auth/quota-exceeded':
        message = 'SMS quota exceeded. Please try again later';
        break;
      case 'auth/invalid-verification-code':
        message = 'Invalid verification code';
        break;
      case 'auth/invalid-verification-id':
        message = 'Invalid verification ID';
        break;
      case 'auth/code-expired':
        message = 'Verification code has expired';
        break;
      case 'auth/too-many-requests':
        message = 'Too many requests. Please try again later';
        break;
      case 'auth/popup-closed-by-user':
        message = 'Sign-in popup was closed before completion';
        break;
      case 'auth/popup-blocked':
        message = 'Sign-in popup was blocked by the browser';
        break;
      case 'auth/cancelled-popup-request':
        message = 'Sign-in request was cancelled';
        break;
      case 'auth/network-request-failed':
        message = 'Network error. Please check your connection';
        break;
      default:
        message = error.message || 'Authentication failed';
    }

    return new Error(message);
  }
}

export const authService = new AuthService();
export default authService;