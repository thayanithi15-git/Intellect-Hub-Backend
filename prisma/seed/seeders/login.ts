
export const loginData = [
  {
    userId: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "$2b$10$hashedpassword1", // bcrypt hashed password
    role: "user",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    userId: 2,
    username: "alice_smith",
    email: "alice@example.com",
    password: "$2b$10$hashedpassword2",
    role: "user",
    isActive: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    userId: 3,
    username: "bob_wilson",
    email: "bob@example.com",
    password: "$2b$10$hashedpassword3",
    role: "user",
    isActive: true,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25")
  },
  {
    userId: 4,
    username: "sarah_johnson",
    email: "sarah@example.com",
    password: "$2b$10$hashedpassword4",
    role: "user",
    isActive: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01")
  },
  {
    userId: 5,
    username: "mike_admin",
    email: "admin@example.com",
    password: "$2b$10$hashedpassword5",
    role: "admin",
    isActive: true,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  }
];