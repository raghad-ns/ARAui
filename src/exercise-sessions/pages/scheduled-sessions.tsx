import React, { useEffect, useState } from 'react';
import { getSessions,addSession } from '../sessions-functions';

const ScheduledSessions: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const patientId = "patient_id_example"; 
      const data = await getSessions(patientId);
      setSessions(data);
    };
    fetchSessions();
  }, []);

  const handleAddSession = async () => {
    const patientId = "patient_id_example"; 
    const newSession = {
      patientId: "patient_id_example",  // Ideally, this should be dynamically selected or passed from patient data
      date: "2023-02-20",
      exercise: "Elbow Flexion",
      duration: "15 minutes",
      therapist: "Dr. Smith"
    };
    await addSession(patientId,newSession);  // Add new session to Firestore
  };

  return (
    <div>
      <h1>Scheduled Sessions</h1>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            {session.date} - {session.exercise} for {session.patientId} by {session.therapist}
          </li>
        ))}
      </ul>
      <button onClick={handleAddSession}>Add New Session</button>
    </div>
  );
};

export default ScheduledSessions;



