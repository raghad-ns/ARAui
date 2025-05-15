import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSessions, addSession, setLatestSession } from "../../sessions-functions";
import { auth } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import './scheduled-sessions.css';

const ScheduledSessions: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
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

  const showSessionDetails = (sessionId: string) => navigate(`/sessionDetails/${sessionId}`)

  const handleStartSession = (patientId: string, session: any) => {
    const db = getDatabase();
    const sessionRef = ref(db, `activeSessions/${patientId}/${session.id}`);

    // Add a status field to show "in progress"
    const sessionWithStatus = {
      ...session,
      status: "in progress",
      startedAt: new Date().toISOString(),
    };

    set(sessionRef, sessionWithStatus)
      .then(() => {
        console.log("Session data sent to Firebase!");
      })
      .catch((error) => {
        console.error("Error writing to Firebase:", error);
      });
  };

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
      <div className="session-form">
        <div className="addSession">
          <span className="addSessionDetails">
            <span className="title">Schedule Session</span>
            <span>Fill the following fields to schedule exercise session for this patient</span>
          </span>
          <button onClick={handleAddSession}>Add Session</button>
        </div>
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
              <tr key={session.id} onClick={() => showSessionDetails(session.id)}>
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
