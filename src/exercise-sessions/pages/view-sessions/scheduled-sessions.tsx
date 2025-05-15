import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSessions, addSession, setLatestSession } from "../../sessions-functions";
import { auth } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import './scheduled-sessions.css';

const ScheduledSessions: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [sessions, setSessions] = useState<any[]>([]);

  const [newSession, setNewSession] = useState({
    date: "",
    duration: "",
    therapistId: "",
    extentionAngle: "",
    flectionAngle: "",
    repetitions: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value, therapistId: "55" });
  };

  const handleAddSession = async () => {
    if (!patientId) {
      alert("Missing patient ID from URL!");
      return;
    }

    if (
      !newSession.date ||
      !newSession.duration ||
      !newSession.extentionAngle ||
      !newSession.flectionAngle ||
      !newSession.repetitions
    ) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const therapistId = auth.currentUser?.uid;
      let therapistName = "Unknown";
      if (!therapistId) {
        alert("You must be logged in to add a session.");
        return;
      }

      const therapistDoc = await getDoc(doc(db, "therapists", therapistId));
      if (therapistDoc.exists()) {
        therapistName = therapistDoc.data().name;
      }

      // Default new session has status 0 ("Scheduled")
      const sessionData = {
        ...newSession,
        therapistId,
        therapist: therapistName,
        status: 0,
      };

      // Add to Firestore
      const addedSession = await addSession(patientId, sessionData);

      // Set to Realtime DB as the latest session
      await setLatestSession(patientId, {
        ...sessionData,
        id: addedSession.id, // ensure ID is included in Realtime
      });

      setNewSession({
        date: "",
        duration: "",
        therapistId: "",
        extentionAngle: "",
        flectionAngle: "",
        repetitions: "",
      });

      const updatedSessions = await getSessions(patientId);
      setSessions(updatedSessions);
    } catch (error) {
      console.error("Error adding session with therapist:", error);
    }
  };

  // Map status number to label
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Scheduled";
      case 1:
        return "In Progress";
      case 2:
        return "Completed";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="view-sessions">
      <h1>Patient Sessions</h1>

      <div className="session-form">
        <div className="inputFields">
          <input
            type="date"
            name="date"
            placeholder="Schedule on..."
            value={newSession.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={newSession.duration}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="extentionAngle"
            placeholder="Extension angle (°)"
            value={newSession.extentionAngle}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="flectionAngle"
            placeholder="Flexion angle (°)"
            value={newSession.flectionAngle}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="repetitions"
            placeholder="Repetitions"
            value={newSession.repetitions}
            onChange={handleChange}
            required
          />
        </div>
        <button onClick={handleAddSession}>Add Session</button>
      </div>

      <div className="sessionsTable">
        <table>
          <thead>
            <tr>
              <th>Scheduled Date</th>
              <th>Duration</th>
              <th>Therapist</th>
              <th>Extension angle (°)</th>
              <th>Flexion angle (°)</th>
              <th>Repetitions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id}>
                <td>{session.date}</td>
                <td>{session.duration}</td>
                <td>{session.therapist}</td>
                <td>{session.extentionAngle}</td>
                <td>{session.flectionAngle}</td>
                <td>{session.repetitions}</td>
                <td>{getStatusText(session.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduledSessions;
