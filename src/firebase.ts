import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./firebase"; // Assuming you have initialized firebase app in firebase.ts

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // You can now use the user and token objects as needed (e.g., save user data to database, navigate)
    console.log("Signed in with Google:", user);
    console.log("Google Access Token:", token);

    return user;

  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.error("Error signing in with Google:", errorMessage, errorCode, email, credential);
    throw error; // Re-throw the error for further handling in the calling component
  }
};

export { app };
