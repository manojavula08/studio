
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

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let firebaseInitialized = false;

function initializeFirebase(): void {
  if (firebaseInitialized) return;

  if (
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  ) {
    try {
      if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApp();
      }
      db = getFirestore(app);
      auth = getAuth(app);
      firebaseInitialized = true;
    } catch (e) {
        console.error("Firebase initialization failed with an exception:", e);
    }
  } else {
    console.error('**********************************************************************************');
    console.error('*** FIREBASE IS NOT CONFIGURED!                                                  ***');
    console.error('***                                                                              ***');
    console.error('*** Please create a .env.local file in the root of your project and add your     ***');
    console.error('*** Firebase credentials. Any features requiring Firebase will be disabled.      ***');
    console.error('***                                                                              ***');
    console.error('*** Missing values:                                                              ***');
    if (!firebaseConfig.apiKey) console.error('*** - NEXT_PUBLIC_FIREBASE_API_KEY                                               ***');
    if (!firebaseConfig.authDomain) console.error('*** - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN                                           ***');
    if (!firebaseConfig.projectId) console.error('*** - NEXT_PUBLIC_FIREBASE_PROJECT_ID                                            ***');
    if (!firebaseConfig.appId) console.error('*** - NEXT_PUBLIC_FIREBASE_APP_ID                                                ***');
    console.error('**********************************************************************************');
  }
}

initializeFirebase();

// We export the initialized services, which will be null if initialization failed.
// Code using these exports must handle the null case.
export { app, db, auth };

