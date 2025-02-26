import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from '.././firebase-config';

// Add a report to a patient
export const addReport = async (patientId: string, reportData: any) => {
  try {
    const patientRef = doc(db, "patients", patientId);
    const reportsCollection = collection(patientRef, "reports");
    const docRef = await addDoc(reportsCollection, reportData);
    console.log("Report added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding report: ", error);
  }
};

// Get all reports for a patient
export const getReports = async (patientId: string) => {
  const patientRef = doc(db, "patients", patientId);
  const reportsCollection = collection(patientRef, "reports");
  const querySnapshot = await getDocs(reportsCollection);
  const reports: any[] = [];
  querySnapshot.forEach((doc) => {
    reports.push({ id: doc.id, ...doc.data() });
  });
  return reports;
};
