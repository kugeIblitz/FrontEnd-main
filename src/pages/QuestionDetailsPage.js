import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./QuestionDetailsPage.css";
import "./spinnerLoader.css";
import Sidebar from "./Sidebar";


function QuestionDetailsPage() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://127.0.0.1:8000/api/questions/${id}`)
      .then((response) => {
        setQuestion(response.data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://127.0.0.1:8000/api/questions/${id}/answers`)
      .then((response) => {
        setAnswers(response.data["hydra:member"]);
      });
  }, [id]);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://127.0.0.1:8000/api/answers", {
        content: answer,
        question: `/api/questions/${id}`,
      })
      .then((response) => {
        setAnswers([...answers, response.data]);
        setAnswer("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
      </div>
      <Sidebar/>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div
          style={{ marginLeft: "520px", marginTop: "1px" }}
          className="question-container"
        >
          <h1>{question.title}</h1>
          <p>{"- " + question.content}</p>
          <h2>Answers</h2>
          {answers.map((ans) => (
            <div key={ans.id}>
              <li>{ans.content}</li>
            </div>
          ))}

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="answer">Your answer:</label>
                <div className="input-container">
                  <textarea
                    className="form-control"
                    id="answer"
                    name="answer"
                    rows="4"
                    value={answer}
                    onChange={handleAnswerChange}
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionDetailsPage;
