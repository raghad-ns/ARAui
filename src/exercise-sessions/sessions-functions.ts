// // import { collection, addDoc, getDocs, doc } from "firebase/firestore";
// // import { db } from '.././firebase-config';

// // // Add a session to a specific patient
// // export const addSession = async (patientId: string, sessionData: any) => {
// //   try {
// //     const patientRef = doc(db, "patients", patientId);
// //     const sessionsCollection = collection(patientRef, "sessions");
// //     const docRef = await addDoc(sessionsCollection, sessionData);
// //     console.log("Session added with ID: ", docRef.id);
// //   } catch (error) {
// //     console.error("Error adding session: ", error);
// //   }
// // };

// // // Get all sessions for a specific patient
// // export const getSessions = async (patientId: string) => {
// //   const patientRef = doc(db, "patients", patientId);
// //   const sessionsCollection = collection(patientRef, "sessions");
// //   const querySnapshot = await getDocs(sessionsCollection);
// //   const sessions: any[] = [];
// //   querySnapshot.forEach((doc) => {
// //     sessions.push({ id: doc.id, ...doc.data() });
// //   });
// //   return sessions;
// // };
// import { collection, addDoc, getDocs, doc } from "firebase/firestore";
// import { db } from "../firebase-config";

// // Add a session for a specific patient
// export const addSession = async (patientId: string, sessionData: any) => {
//   try {
//     const patientRef = doc(db, "patients", patientId);
//     const sessionsCollection = collection(patientRef, "sessions");
//     const docRef = await addDoc(sessionsCollection, sessionData);
//     console.log("Session added with ID: ", docRef.id);
//   } catch (error) {
//     console.error("Error adding session: ", error);
//   }
// };

// // Get all sessions for a specific patient
// export const getSessions = async (patientId: string) => {
//   try {
//     const patientRef = doc(db, "patients", patientId);
//     const sessionsCollection = collection(patientRef, "sessions");
//     const querySnapshot = await getDocs(sessionsCollection);
//     const sessions: any[] = [];
//     querySnapshot.forEach((doc) => {
//       sessions.push({ id: doc.id, ...doc.data() });
//     });
//     return sessions;
//   } catch (error) {
//     console.error("Error getting sessions: ", error);
//     return [];
//   }
// };
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

enum sessionStatus {
  SCHEDULED,
  INPROGRESS,
  COMPLETED,
}

// Add a session for a specific patient
export const addSession = async (patientId: string, sessionData: any) => {
  try {
    await addDoc(collection(db, "sessions"), {
      ...sessionData,
      patientId,
      status: sessionStatus.SCHEDULED,
      timestamp: new Date(),
    });
    console.log("Session added to global 'sessions' collection.");
  } catch (error) {
    console.error("Error adding session: ", error);
  }
};



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
;
