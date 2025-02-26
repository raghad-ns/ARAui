import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from '.././firebase-config';

// Add a session to a specific patient
export const addSession = async (patientId: string, sessionData: any) => {
  try {
    const patientRef = doc(db, "patients", patientId);
    const sessionsCollection = collection(patientRef, "sessions");
    const docRef = await addDoc(sessionsCollection, sessionData);
    console.log("Session added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding session: ", error);
  }
};

// Get all sessions for a specific patient
export const getSessions = async (patientId: string) => {
  const patientRef = doc(db, "patients", patientId);
  const sessionsCollection = collection(patientRef, "sessions");
  const querySnapshot = await getDocs(sessionsCollection);
  const sessions: any[] = [];
  querySnapshot.forEach((doc) => {
    sessions.push({ id: doc.id, ...doc.data() });
  });
  return sessions;
};
