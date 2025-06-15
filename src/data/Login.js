// ✅ src/data/Login.js
const mockUsers = [
  {
    user_id: "u001",
    role: "elderly",
    email: "elder1@example.com",
    email_verified: true,
    hashed_password: "123456",
  },
  {
    user_id: "u002",
    role: "nurse",
    email: "nurse1@example.com",
    email_verified: true,
    hashed_password: "abc123",
    student_id: "sv001",
    card_id: "CARD-001",
  },
];

export default mockUsers;
export const getUserByEmail = (email) => {
  return mockUsers.find((user) => user.email === email);
};
export const getUserById = (user_id) => {
  return mockUsers.find((user) => user.user_id === user_id);
};
export const getUserByStudentId = (student_id) => {
  return mockUsers.find((user) => user.student_id === student_id);
};
export const getUserByCardId = (card_id) => {
  return mockUsers.find((user) => user.card_id === card_id);
};
export const getUserByHashedPassword = (hashed_password) => {
  return mockUsers.find((user) => user.hashed_password === hashed_password);
};
export const getUserByRole = (role) => {
  return mockUsers.filter((user) => user.role === role);
};
export const getAllUsers = () => {
  return mockUsers;
};
export const addUser = (user) => {
  mockUsers.push(user);
};
export const updateUser = (user_id, updatedData) => {
  const userIndex = mockUsers.findIndex((user) => user.user_id === user_id);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData };
  }
};
export const deleteUser = (user_id) => {
  const userIndex = mockUsers.findIndex((user) => user.user_id === user_id);
  if (userIndex !== -1) {
    mockUsers.splice(userIndex, 1);
  }
};
export const verifyUserEmail = (email) => {
  const user = getUserByEmail(email);
  if (user) {
    user.email_verified = true;
    return true;
  }
  return false;
};
export const isEmailVerified = (email) => {
  const user = getUserByEmail(email);
  return user ? user.email_verified : false;
};
export const isPasswordValid = (email, password) => {
  const user = getUserByEmail(email);
  return user ? user.hashed_password === password : false;
};
export const getUserRole = (user_id) => {
  const user = getUserById(user_id);
  return user ? user.role : null;
};
export const getUserFullName = (user_id) => {
  const user = getUserById(user_id);
  return user ? user.full_name : null;
};
export const getUserEmail = (user_id) => {
  const user = getUserById(user_id);
  return user ? user.email : null;
};
