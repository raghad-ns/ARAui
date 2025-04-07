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
    angle: "",
    speed: "",
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
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
  };

  const handleAddSession = async () => {
    if (!newSession.date || !newSession.exercise || !newSession.duration || !newSession.angle || !newSession.speed || !newSession.repetitions) {
      alert("Please fill in all fields!");
      return;
    }
    await addSession(patientId!, newSession);
    setNewSession({ date: "", exercise: "", duration: "", therapist: "", angle: "", speed: "", repetitions: "" });

    const updatedSessions = await getSessions(patientId!);
    setSessions(updatedSessions);
  };

  return (
    <div>
      <h1>Patient Sessions</h1>

      <div className="session-form">
        <input type="date" name="date" value={newSession.date} onChange={handleChange} required />
        <input type="text" name="exercise" placeholder="Exercise" value={newSession.exercise} onChange={handleChange} required />
        <input type="text" name="duration" placeholder="Duration" value={newSession.duration} onChange={handleChange} required />
        <input type="text" name="therapist" placeholder="Therapist" value={newSession.therapist} onChange={handleChange} />
        <input type="number" name="angle" placeholder="Angle (°)" value={newSession.angle} onChange={handleChange} required />
        <input type="number" name="speed" placeholder="Speed (cm/s)" value={newSession.speed} onChange={handleChange} required />
        <input type="number" name="repetitions" placeholder="Repetitions" value={newSession.repetitions} onChange={handleChange} required />
        <button onClick={handleAddSession}>Add Session</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Exercise</th>
            <th>Duration</th>
            <th>Therapist</th>
            <th>Angle (°)</th>
            <th>Speed (cm/s)</th>
            <th>Repetitions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.date}</td>
              <td>{session.exercise}</td>
              <td>{session.duration}</td>
              <td>{session.therapist}</td>
              <td>{session.angle}</td>
              <td>{session.speed}</td>
              <td>{session.repetitions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduledSessions;
