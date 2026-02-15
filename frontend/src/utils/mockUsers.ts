import type { User } from '../types';

export const MOCK_USERS: User[] = [
    {
        id: 'u1',
        name: 'Dr. Sharma',
        email: 'dr.sharma@vitaliq.com',
        role: 'Doctor',
        avatar: 'https://ui-avatars.com/api/?name=Dr+Sharma&background=0D8ABC&color=fff'
    },
    {
        id: 'u2',
        name: 'Nurse Priya',
        email: 'nurse.priya@vitaliq.com',
        role: 'Nurse',
        avatar: 'https://ui-avatars.com/api/?name=Nurse+Priya&background=10B981&color=fff'
    },
    {
        id: 'u3',
        name: 'Admin User',
        email: 'admin@vitaliq.com',
        role: 'Admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=EF4444&color=fff'
    },
    {
        id: 'u4',
        name: 'Pharmacist Ravi',
        email: 'pharma.ravi@vitaliq.com',
        role: 'Pharmacist',
        avatar: 'https://ui-avatars.com/api/?name=Pharma+Ravi&background=F59E0B&color=fff'
    },
    {
        id: 'u5',
        name: 'Receptionist Anjali',
        email: 'reception@vitaliq.com',
        role: 'Receptionist',
        avatar: 'https://ui-avatars.com/api/?name=Receptionist&background=6366F1&color=fff'
    }
];
