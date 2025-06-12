'use server'

import { db } from '@/lib/firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function updateUserProfile(
  uid: string,
  fullName: string,
  company?: string
) {
  try {
    await setDoc(
      doc(db, 'users', uid),
      { fullName, company },
      { merge: true }
    );
    return { success: true };
  } catch (error) {
    console.error('Failed to update user profile', error);
    return { success: false, error: 'Failed to update profile' };
  }
}

export async function getUserProfile(uid: string) {
  try {
    const snapshot = await getDoc(doc(db, 'users', uid));
    if (snapshot.exists()) {
      return { success: true, data: snapshot.data() };
    }
    return { success: true, data: null };
  } catch (error) {
    console.error('Failed to fetch user profile', error);
    return { success: false, error: 'Failed to fetch profile' };
  }
}
