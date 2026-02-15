export type Role = 'Admin' | 'Doctor' | 'Nurse' | 'Pharmacist' | 'Receptionist';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
}

export type RiskLevel = 'High' | 'Medium' | 'Low';
export type Department = 'General Medicine' | 'Cardiology' | 'Emergency' | 'Neurology' | 'Orthopedics';

export interface Vitals {
    bp: string; // e.g., "120/80"
    heartRate: number;
    temperature: number;
    spo2: number;
    weight?: number;
}

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    contact: string;
    symptoms: string[];
    vitals: Vitals;
    history: string[];
    riskScore: number; // 0-100
    riskLevel: RiskLevel;
    recommendedDept: Department;
    admittedAt: string;
    status: 'Waiting' | 'In Consultation' | 'Admitted' | 'Discharged';
    assignedDoctor?: string;
    explainability?: string[]; // AI reasons
}
