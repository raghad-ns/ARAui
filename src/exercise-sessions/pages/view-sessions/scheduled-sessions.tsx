import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSessions, addSession } from "../../sessions-functions";
import { auth } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

import './scheduled-sessions.css'

const ScheduledSessions: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  // console.log("Patient ID from URL:", patientId);

  const [sessions, setSessions] = useState<any[]>([]);
  const [newSession, setNewSession] = useState({
    date: "",
    duration: "",
    therapistId: "",
    extentionAngle: "",
    flectionAngle: "",
    repetitions: ""
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


  // const handleAddSession = async () => {
  //   if (
  //     !newSession.date ||
  //     !newSession.duration ||
  //     !newSession.extentionAngle ||
  //     !newSession.flectionAngle ||
  //     !newSession.repetitions
  //   ) {
  //     alert("Please fill in all fields!");
  //     return;
  //   }
  
  //   try {
  //     const therapistId = auth.currentUser?.uid;
  //     let therapistName = "Unknown";
  //     if (!therapistId) {
  //       alert("You must be logged in to add a session.");
  //       return;
  //     }
      
  //     if (therapistId) {
  //       const therapistDoc = await getDoc(doc(db, "therapists", therapistId));
  //       if (therapistDoc.exists()) {
  //         therapistName = therapistDoc.data().name;
  //       }
  //     }
  
  //     await addSession(patientId!, {
  //       ...newSession,
  //       therapistId,
  //       therapist: therapistName,
  //     });
  
  //     setNewSession({
  //       date: "",
  //       duration: "",
  //       therapistId: "",
  //       extentionAngle: "",
  //       flectionAngle: "",
  //       repetitions: ""
  //     });
  
  //     const updatedSessions = await getSessions(patientId!);
  //     setSessions(updatedSessions);
  //   } catch (error) {
  //     console.error("Error adding session with therapist:", error);
  //   }
  // };
  
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
  
      await addSession(patientId, {
        ...newSession,
        therapistId,
        therapist: therapistName,
      });
  
      setNewSession({
        date: "",
        duration: "",
        therapistId: "",
        extentionAngle: "",
        flectionAngle: "",
        repetitions: ""
      });
  
      const updatedSessions = await getSessions(patientId);
      setSessions(updatedSessions);
    } catch (error) {
      console.error("Error adding session with therapist:", error);
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
            placeholder="schedule on..."
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
            placeholder="Extention angle (°)"
            value={newSession.extentionAngle}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="flectionAngle"
            placeholder="Flection angle (°)"
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
              <th>Thyrapist</th>
              <th>Extention angle (°)</th>
              <th>Flection angle (°)</th>
              <th>Repetitions</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduledSessions;
