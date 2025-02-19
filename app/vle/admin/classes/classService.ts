const API_URL = "https://your-backend.com/api/classes"; // Change this to your actual API

// Fetch all classes
export const getAllClasses = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

// Fetch a class by ID
export const getClassById = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

// Create a new class
export const createClass = async (classData: { name: string; isVisible: boolean }) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(classData),
  });
  return res.json();
};

// Update an existing class
export const updateClass = async (id: string, classData: { name: string; isVisible: boolean }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(classData),
  });
  return res.json();
};

// Delete a class
export const deleteClass = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
