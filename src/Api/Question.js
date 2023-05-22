import axios from "axios";
export async function getAllQuestions() {
    try {
      // const response = await axios.get(`${API_URL}/questions?page=1`);
      const response = await axios.get("https://127.0.0.1:8000/api/questions?page=1");
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
} 

export async function getQuestionWithId(id) {
    try {
      // const response = await axios.delete(`${API_URL}/questions/${id}`);
      const response = await axios.get("https://127.0.0.1:8000/api/questions/"+id);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}
const API_URL = "https://127.0.0.1:8000/api";



export async function createQuestion(title, content) {
  try {
    const response = await axios.post(`${API_URL}/questions`, {
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateQuestion(id, title, content) {
  try {
    const response = await axios.put(`${API_URL}/questions/${id}`, {
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteQuestion(id) {
  try {
    const response = await axios.delete(`${API_URL}/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}



export async function postQuestion(questionData) {
  try {
    const response = await axios.post("https://127.0.0.1:8000/api/questions", questionData);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}  