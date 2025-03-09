// // import React, { useEffect, useState } from "react";
// // import { getPatients, addPatient } from "../patients-functions";
// // import Table from "../../common/table/table";
// // import "./view-patients.css";

// // const ViewPatients: React.FC = () => {
// //   const [patients, setPatients] = useState<any[]>([]);
// //   const [newPatient, setNewPatient] = useState({
// //     name: "",
// //     age: "",
// //     gender: "",
// //     bmi: "",
// //     diagnose: "",
// //     notes: "",
// //   });

// //   // Fetch patients from Firestore
// //   useEffect(() => {
// //     const fetchPatients = async () => {
// //       const data = await getPatients();
// //       setPatients(data);
// //     };
// //     fetchPatients();
// //   }, []);

// //   // Handle input change
// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
// //   };

// //   // Add patient to Firestore
// //   const handleAddPatient = async () => {
// //     if (!newPatient.name || !newPatient.age || !newPatient.diagnose) {
// //       alert("Please fill in required fields (Name, Age, Diagnosis)");
// //       return;
// //     }

// //     await addPatient(newPatient);
// //     setNewPatient({ name: "", age: "", gender: "", bmi: "", diagnose: "", notes: "" });

// //     // Refresh the list of patients
// //     const updatedPatients = await getPatients();
// //     setPatients(updatedPatients);
// //   };

// //   return (
// //     <div className="view-patients">
// //       <h2>Manage Patients</h2>

// //       {/* Input Fields for New Patient */}
// //       <div className="patient-form">
// //         <input type="text" name="name" placeholder="Name" value={newPatient.name} onChange={handleChange} required />
// //         <input type="number" name="age" placeholder="Age" value={newPatient.age} onChange={handleChange} required />
// //         <input type="text" name="gender" placeholder="Gender" value={newPatient.gender} onChange={handleChange} />
// //         <input type="text" name="bmi" placeholder="BMI" value={newPatient.bmi} onChange={handleChange} />
// //         <input type="text" name="diagnose" placeholder="Diagnosis" value={newPatient.diagnose} onChange={handleChange} required />
// //         <input type="text" name="notes" placeholder="Notes" value={newPatient.notes} onChange={handleChange} />
// //         <button onClick={handleAddPatient}>Add Patient</button>
// //       </div>

// //       {/* Patients Table */}
// //       <Table records={patients} />
// //     </div>
// //   );
// // };

// // export default ViewPatients;

// import React, { useEffect, useState } from "react";
// import { getPatients } from "../patients-functions";
// import { useNavigate } from "react-router-dom";
// import Table from "../../common/table/table";
// import "./view-patients.css";

// const ViewPatients: React.FC = () => {
//   const [patients, setPatients] = useState<any[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPatients = async () => {
//       const data = await getPatients();
//       setPatients(data);
//     };
//     fetchPatients();
//   }, []);

//   // Handle row click to navigate to sessions page
//   const handleRowClick = (patientId: string) => {
//     navigate(`/sessions/${patientId}`);
//   };

//   return (
//     <div className="view-patients">
//       <h2>Manage Patients</h2>

//       {/* Patients Table */}
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Diagnosis</th>
//           </tr>
//         </thead>
//         <tbody>
//           {patients.map((patient) => (
//             <tr key={patient.id} onClick={() => handleRowClick(patient.id)} style={{ cursor: "pointer" }}>
//               <td>{patient.name}</td>
//               <td>{patient.age}</td>
//               <td>{patient.diagnose}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewPatients;


import React, { useEffect, useState } from "react";
import { getPatients, addPatient } from "../patients-functions";
import { useNavigate } from "react-router-dom";
import "./view-patients.css";

const ViewPatients: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    bmi: "",
    diagnose: "",
    notes: "",
  });

  const navigate = useNavigate();

  // Fetch patients from Firestore
  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatients();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPatient({ 
      ...newPatient, 
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value
    });
  };

  // Add patient to Firestore and update the table
  const handleAddPatient = async () => {
    if (!newPatient.name || !newPatient.age || !newPatient.diagnose) {
      alert("Please fill in required fields (Name, Age, Diagnosis)");
      return;
    }

    await addPatient(newPatient);
    setNewPatient({ name: "", age: "", gender: "", bmi: "", diagnose: "", notes: "" });

    // Refresh the list of patients
    const updatedPatients = await getPatients();
    setPatients(updatedPatients);
  };

  // Navigate to the session page of the selected patient
  const handleRowClick = (patientId?: string) => {
    if (!patientId) {
      console.error("Invalid patient ID");
      return;
    }
    navigate(`/sessions/${patientId}`);
  };

  return (
    <div className="view-patients">
      <h2>Manage Patients</h2>

      {/* Input Fields for New Patient */}
      <div className="patient-form">
        <input type="text" name="name" placeholder="Name" value={newPatient.name} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={newPatient.age} onChange={handleChange} required />
        <input type="text" name="gender" placeholder="Gender" value={newPatient.gender} onChange={handleChange} />
        <input type="text" name="bmi" placeholder="BMI" value={newPatient.bmi} onChange={handleChange} />
        <input type="text" name="diagnose" placeholder="Diagnosis" value={newPatient.diagnose} onChange={handleChange} required />
        <input type="text" name="notes" placeholder="Notes" value={newPatient.notes} onChange={handleChange} />
        <button onClick={handleAddPatient}>Add Patient</button>
      </div>

      {/* Patients Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Diagnosis</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} onClick={() => handleRowClick(patient.id)} style={{ cursor: "pointer" }}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.diagnose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPatients;
