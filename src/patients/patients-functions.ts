import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc,query ,where } from "firebase/firestore";
import { db,auth } from "../firebase-config";

// // Add a new patient
// export const addPatient = async (patient: any) => {
//   try {
//     const docRef = await addDoc(collection(db, "patients"), patient);
//     console.log("Patient added with ID: ", docRef.id);
//   } catch (error) {
//     console.error("Error adding patient: ", error);
//   }
// };
// import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
// import { db, auth } from "../firebase-config"; 

// Add a new patient and link them to the logged-in therapist
export const addPatient = async (patient: any) => {
  try {
    if (!auth.currentUser) {
      console.error("No therapist is logged in.");
      return;
    }

    const therapistId = auth.currentUser.uid; // Get logged-in therapist ID

    const docRef = await addDoc(collection(db, "patients"), {
      ...patient,
      therapistId, // Store therapist's UID
    });

    console.log("Patient added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding patient: ", error);
  }
};


// // Get all patients
// export const getPatients = async () => {
//   const querySnapshot = await getDocs(collection(db, "patients"));
//   const patients: any[] = [];
//   querySnapshot.forEach((doc) => {
//     patients.push({ id: doc.id, ...doc.data() });
//   });
//   return patients;
// };

export const getPatients = async () => {
  try {
    if (!auth.currentUser) {
      console.error("No therapist is logged in.");
      return [];
    }

    const therapistId = auth.currentUser.uid; // Get logged-in therapist ID
    const patientsQuery = query(collection(db, "patients"), where("therapistId", "==", therapistId));
    const querySnapshot = await getDocs(patientsQuery);

    const patients: any[] = [];
    querySnapshot.forEach((doc) => {
      patients.push({ id: doc.id, ...doc.data() });
    });

    return patients;
  } catch (error) {
    console.error("Error fetching patients: ", error);
    return [];
  }
};


// Update patient info
export const updatePatient = async (patientId: string, updatedPatient: any) => {
  try {
    const patientRef = doc(db, "patients", patientId);
    await updateDoc(patientRef, updatedPatient);
    console.log("Patient updated");
  } catch (error) {
    console.error("Error updating patient: ", error);
  }
};

// Delete a patient
export const deletePatient = async (patientId: string) => {
  try {
    const patientRef = doc(db, "patients", patientId);
    await deleteDoc(patientRef);
    console.log("Patient deleted");
  } catch (error) {
    console.error("Error deleting patient: ", error);
  }
};
