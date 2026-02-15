import type { Patient, Vitals } from '../types';
import { analyzePatient } from './mockAI';

const NAMES = ['Aarav', 'Vihaan', 'Aditya', 'Sai', 'Karthik', 'Priya', 'Diya', 'Ananya', 'Riya', 'Lakshmi', 'Ramesh', 'Suresh', 'Deepak', 'Sanjay', 'Meera'];
const SURNAMES = ['Sharma', 'Verma', 'Patel', 'Reddy', 'Nair', 'Iyer', 'Menon', 'Rao', 'Singh', 'Gupta', 'Kumar', 'Das'];
const SYMPTOMS_LIST = ['Chest Pain', 'Shortness of Breath', 'Fever', 'Cough', 'Headache', 'Nausea', 'Dizziness', 'Abdominal Pain', 'Back Pain', 'Fatigue'];

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const generatePatient = (id: string): Patient => {
    const age = getRandomInt(18, 85);
    const symptoms = [getRandom(SYMPTOMS_LIST)];
    if (Math.random() > 0.7) symptoms.push(getRandom(SYMPTOMS_LIST));

    const vitals: Vitals = {
        bp: `${getRandomInt(100, 160)}/${getRandomInt(60, 100)}`,
        heartRate: getRandomInt(60, 120),
        temperature: parseFloat((36.5 + Math.random() * 2).toFixed(1)),
        spo2: getRandomInt(92, 100),
        weight: getRandomInt(50, 100)
    };

    const aiResult = analyzePatient(age, vitals, symptoms);

    return {
        id,
        name: `${getRandom(NAMES)} ${getRandom(SURNAMES)}`,
        age,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        contact: `+91 ${getRandomInt(7000000000, 9999999999)}`,
        symptoms,
        vitals,
        history: Math.random() > 0.7 ? ['Diabetes'] : [],
        riskScore: aiResult.riskScore,
        riskLevel: aiResult.riskLevel,
        recommendedDept: aiResult.department,
        admittedAt: new Date(Date.now() - getRandomInt(0, 10000000)).toISOString(),
        status: 'Waiting',
        explainability: aiResult.explainability
    };
};

export const generateMockPatients = (count: number): Patient[] => {
    return Array.from({ length: count }, (_, i) => generatePatient(`P-${1000 + i}`));
};
