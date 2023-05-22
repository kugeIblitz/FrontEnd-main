import axios from "axios";

const API_URL = "https://localhost:8000/api";

export async function getAllUsers() {
  try {
    const response = await axios.get(`${API_URL}/users?page=1`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
