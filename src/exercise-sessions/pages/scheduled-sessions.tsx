// import React, { useEffect, useState } from 'react';
// import { getSessions,addSession } from '../sessions-functions';

// const ScheduledSessions: React.FC = () => {
//   const [sessions, setSessions] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchSessions = async () => {
//       const patientId = "patient_id_example"; 
//       const data = await getSessions(patientId);
//       setSessions(data);
//     };
//     fetchSessions();
//   }, []);

//   const handleAddSession = async () => {
//     const patientId = "patient_id_example"; 
//     const newSession = {
//       patientId: "patient_id_example",  // Ideally, this should be dynamically selected or passed from patient data
//       date: "2023-02-20",
//       exercise: "Elbow Flexion",
//       duration: "15 minutes",
//       therapist: "Dr. Smith"
//     };
//     await addSession(patientId,newSession);  // Add new session to Firestore
//   };

//   return (
//     <div>
//       <h1>Scheduled Sessions</h1>
//       <ul>
//         {sessions.map((session) => (
//           <li key={session.id}>
//             {session.date} - {session.exercise} for {session.patientId} by {session.therapist}
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleAddSession}>Add New Session</button>
//     </div>
//   );
// };

// export default ScheduledSessions;

 

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSessions, addSession } from "../sessions-functions";

const ScheduledSessions: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [sessions, setSessions] = useState<any[]>([]);
  const [newSession, setNewSession] = useState({
    date: "",
    exercise: "",
    duration: "",
    therapist: "",
  });

  useEffect(() => {
    const fetchSessions = async () => {
      if (patientId) {
        const data = await getSessions(patientId);
        setSessions(data);
      }
    };
    fetchSessions();
  }, [patientId]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
  };

  // Add new session
  const handleAddSession = async () => {
    if (!newSession.date || !newSession.exercise || !newSession.duration) {
      alert("Please fill in required fields!");
      return;
    }
    await addSession(patientId!, newSession);
    setNewSession({ date: "", exercise: "", duration: "", therapist: "" });

    // Refresh sessions list
    const updatedSessions = await getSessions(patientId!);
    setSessions(updatedSessions);
  };

  return (
    <div>
      <h1>Patient Sessions</h1>

      {/* Input Fields to Add Session */}
      <div className="session-form">
        <input type="date" name="date" value={newSession.date} onChange={handleChange} required />
        <input type="text" name="exercise" placeholder="Exercise" value={newSession.exercise} onChange={handleChange} required />
        <input type="text" name="duration" placeholder="Duration" value={newSession.duration} onChange={handleChange} required />
        <input type="text" name="therapist" placeholder="Therapist" value={newSession.therapist} onChange={handleChange} />
        <button onClick={handleAddSession}>Add Session</button>
      </div>

      {/* Sessions Table */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Exercise</th>
            <th>Duration</th>
            <th>Therapist</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.date}</td>
              <td>{session.exercise}</td>
              <td>{session.duration}</td>
              <td>{session.therapist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduledSessions;
