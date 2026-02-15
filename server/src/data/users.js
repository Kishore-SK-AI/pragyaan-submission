const users = [
    {
        id: 1,
        name: "Admin User",
        email: "admin.demo@kauvery.com",
        password: "password123", // In real app, this should be hashed
        role: "Admin"
    },
    {
        id: 2,
        name: "Dr. Smith",
        email: "doctor.demo@kauvery.com",
        password: "password123",
        role: "Doctor"
    },
    {
        id: 3,
        name: "Nurse Joy",
        email: "nurse.demo@kauvery.com",
        password: "password123",
        role: "Nurse"
    },
    {
        id: 4,
        name: "Pharm. Bob",
        email: "pharmacist.demo@kauvery.com",
        password: "password123",
        role: "Pharmacist"
    },
    {
        id: 5,
        name: "Recep. Alice",
        email: "receptionist.demo@kauvery.com",
        password: "password123",
        role: "Receptionist"
    }
];

module.exports = users;
