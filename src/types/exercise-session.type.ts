export interface IExerciseSession{
    id: number;
    patientId: number;
    extentionAngle: number;
    flexionAngle: number;
    repetition: number;
    sessionDate: Date;
    sessionTime: Date;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
}