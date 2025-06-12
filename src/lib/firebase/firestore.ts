
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

// Ensure you have a .env.local file with your Firebase project credentials:
/*
Example .env.local:

NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"

Restart your Next.js dev server after creating/modifying .env.local
*/

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
    // Log the config being used, helpful for debugging environment variable issues.
    // console.log('Attempting to initialize Firebase with config:', firebaseConfig);

    if (
      !firebaseConfig.apiKey ||
      !firebaseConfig.authDomain ||
      !firebaseConfig.projectId ||
      !firebaseConfig.appId
    ) {
      // This error means your .env.local file is likely missing or incorrect,
      // or you haven't restarted the dev server after changing it.
      console.error('Firebase Initialization Error: One or more NEXT_PUBLIC_FIREBASE_ environment variables are missing or undefined.');
      console.error('Values seen by the application (check your server console):');
      console.error(`  NEXT_PUBLIC_FIREBASE_API_KEY: ${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`);
      console.error(`  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`);
      console.error(`  NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
      console.error(`  NEXT_PUBLIC_FIREBASE_APP_ID: ${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`);
      console.error(`  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`);
      console.error(`  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`);
      console.error('Please ensure these are correctly set in your .env.local file (in the project root) and that you have restarted your Next.js development server.');
      
      throw new Error(
        'Firebase configuration is incomplete. Crucial environment variables (NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_APP_ID) are missing. Please check your .env.local file and restart your server.'
      );
    }
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

export const app: FirebaseApp = initializeFirebaseApp();
export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
