export interface IPatient{
    id: number;
    name: string;
    age: number;
    gender: string;
    weight: number;
    height: number;
    diagnoses: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}