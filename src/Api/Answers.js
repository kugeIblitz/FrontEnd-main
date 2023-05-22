import axios from "axios";

const ANSWERS_API_URL = "https://127.0.0.1:8000/api/answers";

export const getAllAnswers = () => {
  return axios.get(ANSWERS_API_URL).then((response) => {
    return response.data["hydra:member"];
  });
};


const getAnswerById = (id) => {
    return axios.get(`https://127.0.0.1:8000/api/answers/${id}`)
      .then(response => response.data);
  };

  
  const createAnswer = (data) => {
    return axios.post('https://127.0.0.1:8000/api/answers', data)
      .then(response => response.data);
  };

  
  const updateAnswer = (id, data) => {
    return axios.put(`https://127.0.0.1:8000/api/answers/${id}`, data)
      .then(response => response.data);
  };

  
  const deleteAnswer = (id) => {
    return axios.delete(`https://127.0.0.1:8000/api/answers/${id}`)
      .then(response => response.data);
  };
  