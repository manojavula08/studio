
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function initializeFirebaseApp(): FirebaseApp {
  if (!getApps().length) {
    // Ensure all config values are present, otherwise Firebase initialization will fail.
    // This is especially important for server-side contexts where NEXT_PUBLIC_ might not guarantee presence
    // if .env.local is not loaded, though for NEXT_PUBLIC_ prefixed vars, Next.js embeds them.
    if (
      !firebaseConfig.apiKey ||
      !firebaseConfig.authDomain ||
      !firebaseConfig.projectId ||
      !firebaseConfig.appId
    ) {
      throw new Error(
        'Firebase configuration is missing. Ensure NEXT_PUBLIC_FIREBASE_ environment variables are set.'
      );
    }
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

export const app: FirebaseApp = initializeFirebaseApp();
export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);

// It's good practice to ensure environment variables are correctly loaded.
// If any essential NEXT_PUBLIC_FIREBASE_ variables are missing,
// Firebase initialization will fail. The check inside initializeFirebaseApp helps.
// For .env.local to work, you need to restart your Next.js dev server after creating/modifying it.
// Ensure you have a .env.local file with your Firebase project credentials:
/*
Example .env.local:

NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"

*/
