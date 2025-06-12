import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, realTimeDB } from "../firebase-config";
import { getDatabase, ref, set, get, limitToLast, orderByKey } from "firebase/database";

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

// Get session by id
export const getSessionById = async (sessionId: string) => {
  try {
    const docRef = doc(db, "sessions", sessionId);
    const docSnap = await getDoc(docRef);
    return docSnap.data(); // returns the document data
  } catch (error) {
    console.error("Error getting sessions: ", error);
    return null;
  }
};


export async function fetchٌRealTimeData(sessionId = "123456", dataToFetch: string) {
  const rollRef = ref(realTimeDB, `Sessions/${sessionId}/${dataToFetch}`);
  // const rollQuery = query(rollRef, orderByKey(), limitToLast(size));

  const snapshot = await get(rollRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log('roll values: ', Object.values(data))
    return Object.values(data); // returns an array of values
  } else {
    return [];
  }
}
