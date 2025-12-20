const API_URL = import.meta.env.VITE_API_URL;

export const getUserByEmail = async (email) => {
  try {
    const res = await fetch(`${API_URL}/users?email=${email}`);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("getUserByEmail Error:", err);
    return null;
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch (err) {
    console.error("registerUser Error:", err);
    return null;
  }
};


