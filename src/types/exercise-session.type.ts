import { sessionStatus } from "../exercise-sessions/sessions-functions";

export interface IExerciseSession {
  Id: number;
  patientId: string;
  extentionAngle: number;
  flexionAngle: number;
  repetition: number;
  status: sessionStatus;
  date: Date;
  therapist: string;
  therapistId: string;
  timestamp: any;
}
