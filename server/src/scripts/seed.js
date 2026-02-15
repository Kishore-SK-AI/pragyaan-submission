import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import { Admin, Doctor, Nurse, Pharmacist, Receptionist } from '../models/User.js';

dotenv.config();
connectDB();

const seedUsers = async () => {
    try {
        // Clear all collections
        await Admin.deleteMany();
        await Doctor.deleteMany();
        await Nurse.deleteMany();
        await Pharmacist.deleteMany();
        await Receptionist.deleteMany();

        // Admin
        await Admin.create({
            name: "Admin User",
            email: "admin@vitaliq.com",
            password: "password123", // In real app, hash this
            role: "Admin"
        });

        // Doctor
        await Doctor.create({
            name: "Dr. Smith",
            email: "dr.sharma@vitaliq.com",
            password: "password123",
            role: "Doctor",
            specialization: "Cardiology",
            department: "Cardiology"
        });

        // Nurse
        await Nurse.create({
            name: "Nurse Joy",
            email: "nurse.priya@vitaliq.com",
            password: "password123",
            role: "Nurse"
        });

        // Pharmacist
        await Pharmacist.create({
            name: "Pharm. Bob",
            email: "pharma.ravi@vitaliq.com",
            password: "password123",
            role: "Pharmacist",
            licenseNumber: "PH-123456"
        });

        // Receptionist
        await Receptionist.create({
            name: "Recep. Alice",
            email: "reception@vitaliq.com",
            password: "password123",
            role: "Receptionist"
        });

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedUsers();
