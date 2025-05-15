import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { getDatabase, ref, set } from "firebase/database";

export enum sessionStatus {
  SCHEDULED,
  INPROGRESS,
  COMPLETED,
}

// Add a session
// export const addSession = async (patientId: string, sessionData: any) => {
//   try {
//     const newSessionRef = await addDoc(collection(db, "sessions"), {
//       ...sessionData,
//       patientId,
//       status: sessionStatus.SCHEDULED,
//       timestamp: new Date(),
//     });
//     console.log("Session added to global 'sessions' collection.");

//     const rtdb = getDatabase();
//     const latestRef = ref(rtdb, `latestSessions/${patientId}`);
//     await set(latestRef, {
//       ...sessionData,
//       sessionId: newSessionRef.id,
//       status: sessionStatus.SCHEDULED,
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error("Error adding session: ", error);
//   }
// };

export const addSession = async (patientId: string, sessionData: any) => {
  try {
    const newSessionRef = await addDoc(collection(db, "sessions"), {
      ...sessionData,
      patientId,
      status: sessionStatus.SCHEDULED,
      timestamp: new Date(),
    });
    console.log("Session added to global 'sessions' collection.");

    const rtdb = getDatabase();
    const latestRef = ref(rtdb, `latestSessions/${patientId}`);
    await set(latestRef, {
      ...sessionData,
      sessionId: newSessionRef.id,
      status: sessionStatus.SCHEDULED,
      timestamp: new Date().toISOString(),
    });

    return { id: newSessionRef.id };
  } catch (error) {
    console.error("Error adding session: ", error);
    throw error;
  }
};



// Get sessions for a patient
export const getSessions = async (patientId: string) => {
  try {
    const sessionsRef = collection(db, "sessions");
    const q = query(sessionsRef, where("patientId", "==", patientId));

    const querySnapshot = await getDocs(q);

    const sessions: any[] = [];
    querySnapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() });
    });
    return sessions;
  } catch (error) {
    console.error("Error getting sessions: ", error);
    return [];
  }
};

// Set the latest session (for ESP32 to fetch)
export const setLatestSession = async (patientId: string, sessionData: any) => {
  try {
    const rtdb = getDatabase();
    const sessionRef = ref(rtdb, `latestSessions/${patientId}`);
    const dataToSend = {
      ...sessionData,
      sessionId: sessionData.id,
    };
    await set(sessionRef, dataToSend);
    alert("Session marked as latest and sent to ESP32!");
  } catch (error) {
    console.error("Error setting latest session:", error);
    alert("Failed to update latest session");
  }
};
