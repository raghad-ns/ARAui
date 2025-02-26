import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

// Add a new patient
export const addPatient = async (patient: any) => {
  try {
    const docRef = await addDoc(collection(db, "patients"), patient);
    console.log("Patient added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding patient: ", error);
  }
};

// Get all patients
export const getPatients = async () => {
  const querySnapshot = await getDocs(collection(db, "patients"));
  const patients: any[] = [];
  querySnapshot.forEach((doc) => {
    patients.push({ id: doc.id, ...doc.data() });
  });
  return patients;
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
