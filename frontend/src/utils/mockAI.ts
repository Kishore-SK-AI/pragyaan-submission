import type { Patient, RiskLevel, Department } from '../types';

interface AIResult {
    riskScore: number;
    riskLevel: RiskLevel;
    department: Department;
    confidence: number;
    explainability: string[];
}

const SYMPTOM_WEIGHTS: Record<string, number> = {
    'Chest Pain': 50,
    'Shortness of Breath': 40,
    'Severe Headache': 30,
    'High Fever': 20,
    'Dizziness': 25,
    'Nausea': 10,
    'Cough': 10,
    'Abdominal Pain': 25,
};

export const analyzePatient = (age: number, vitals: Patient['vitals'], symptoms: string[]): AIResult => {
    let score = 0;
    const reasons: string[] = [];

    // Age Factor
    if (age > 65) {
        score += 15;
        reasons.push(`High Age (${age}): +15% Risk`);
    } else if (age < 5) {
        score += 10;
        reasons.push(`Pediatric Age (${age}): +10% Risk`);
    }

    // Symptoms Analysis
    let maxSymptomScore = 0;
    symptoms.forEach(sym => {
        const w = SYMPTOM_WEIGHTS[sym] || 5;
        score += w;
        if (w > 10) reasons.push(`${sym}: +${w}% Risk`);
        if (w > maxSymptomScore) maxSymptomScore = w;
    });

    // Vitals Analysis
    const sysBP = parseInt(vitals.bp.split('/')[0]);
    if (sysBP > 160 || sysBP < 90) {
        score += 20;
        reasons.push(`Abnormal BP (${vitals.bp}): +20% Risk`);
    }

    if (vitals.heartRate > 110 || vitals.heartRate < 50) {
        score += 15;
        reasons.push(`Abnormal HR (${vitals.heartRate}): +15% Risk`);
    }

    if (vitals.spo2 < 95) {
        score += 25;
        reasons.push(`Low SpO2 (${vitals.spo2}%): +25% Risk`);
    }

    // Cap Score
    score = Math.min(score, 99);

    // Determine Risk Level & Department
    let level: RiskLevel = 'Low';
    let dept: Department = 'General Medicine';

    if (score >= 70) {
        level = 'High';
        dept = 'Emergency';
    } else if (score >= 40) {
        level = 'Medium';
        if (symptoms.includes('Chest Pain')) dept = 'Cardiology';
        else if (symptoms.includes('Severe Headache')) dept = 'Neurology';
        else dept = 'General Medicine';
    } else {
        dept = 'General Medicine';
    }

    // Refine Department based on symptoms if not Emergency
    if (level !== 'High') {
        if (symptoms.some(s => s.toLowerCase().includes('fracture') || s.toLowerCase().includes('bone'))) dept = 'Orthopedics';
        if (symptoms.some(s => s.toLowerCase().includes('heart') || s.toLowerCase().includes('chest'))) dept = 'Cardiology';
    }

    return {
        riskScore: score,
        riskLevel: level,
        department: dept,
        confidence: 85 + Math.floor(Math.random() * 10), // Mock confidence
        explainability: reasons.slice(0, 3)
    };
};
