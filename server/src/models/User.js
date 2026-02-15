// models/Medicine.js
import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    expiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Medicine = mongoose.model("Medicine", medicineSchema);



const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);


const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "Doctor" },
    specialization: { type: String, required: true },
    department: { type: String, required: true },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);


const pharmacistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "Pharmacist" },
    licenseNumber: { type: String, required: true },

    medicines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
      },
    ],
  },
  { timestamps: true }
);

export const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);



const nurseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "Nurse" },
  },
  { timestamps: true }
);

export const Nurse = mongoose.model("Nurse", nurseSchema);

const receptionistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "Receptionist" },
  },
  { timestamps: true }
);

export const Receptionist = mongoose.model("Receptionist", receptionistSchema);

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    attender: { type: String },
    symptoms: { type: String },
    bloodPressure: { type: String },
    heartRate: { type: Number },
    temp: { type: Number },
    previousConditions: { type: String },
    weight: { type: Number },
    status: { type: String, default: "Active" },
    department: { type: String },
    riskPercent: { type: Number },
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);
