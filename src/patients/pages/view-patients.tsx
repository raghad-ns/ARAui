import React, { useEffect, useState } from 'react';
import { getPatients,addPatient } from './patients-functions';

const ViewPatients: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatients();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  const handleAddPatient = async () => {
    const newPatient = {
      name: "Jane Doe",
      age: 28,
      diagnosis: "Wrist Injury",
      injury_date: "2023-02-01",
      transferred_on: "2023-02-15",
      contraindications: ["Avoid cold therapy"]
    };
    await addPatient(newPatient);  // Add new patient to Firestore
  };

  return (
    <div>
      <h1>Patients List</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>{patient.name} - {patient.diagnosis}</li>
        ))}
      </ul>
      <button onClick={handleAddPatient}>Add New Patient</button>
    </div>
  );
};

export default ViewPatients;
