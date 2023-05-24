import React, { Component } from "react";
import { getAllQuestions, deleteQuestion } from "../Api/Question";
import { Link } from "react-router-dom";
import "./spinnerLoader.css";
import filledHeartIcon from "../images/filledHeartIcon.png";
import heartIcon from "../images/heartIcon.png";
import Sidebar from "./Sidebar";
import AuthDetails from "../auth/AuthDetails";

class HomePage extends Component {
  state = {
    questions: [],
    isLoading: true,
    favorites: [],
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = () => {
    getAllQuestions()
      .then((response) => {
        this.setState({
          questions: response.data["hydra:member"],
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  };

  deleteQuestionById = (id) => {
    deleteQuestion(id)
      .then(() => {
        console.log(`Question with ID ${id} deleted.`);
        this.fetchQuestions();
      })
      .catch((error) => {
        console.error(`Error deleting question with ID ${id}:`, error);
      });
  };

  handleFavoriteClick = (questionId) => {
    this.setState((prevState) => {
      const { favorites } = prevState;

      if (favorites.includes(questionId)) {
        const updatedFavorites = favorites.filter((id) => id !== questionId);
        return { favorites: updatedFavorites };
      } else {
        const updatedFavorites = [...favorites, questionId];
        return { favorites: updatedFavorites };
      }
    });
  };

  renderQuestions() {
    const { favorites, questions } = this.state;

    return (
      <div className="container">
        <nav className="d-flex justify-content-between align-items-center">
          <h1 className="mt-3">Top Questions</h1>
          <AuthDetails />
        </nav>

        {questions.map((question) => (
          <div className="card mb-3" key={question.id}>
            <div className="card-body">
              <h5 className="card-title">{question.title}</h5>
              <p className="card-text">{question.description}</p>
              <Link to={`/questions/${question.id}`} className="btn btn-primary">
                View Question
              </Link>
              <button
                onClick={() => this.deleteQuestionById(question.id)}
                className="btn btn-danger"
                style={{ marginLeft: "15px" }}
              >
                Delete Question
              </button>
              <Link to={`/questions/${question.id}`} className="btn btn-success"
              style={{ marginLeft: "15px" }}>
              Answer question
              </Link>
              <button
                onClick={() => this.handleFavoriteClick(question.id)}
                className="btn btn-link"
              >
                {favorites.includes(question.id) ? (
                  <img
                    src={filledHeartIcon}
                    alt="Filled Heart"
                    className="heart-icon"
                  />
                ) : (
                  <img src={heartIcon} alt="Heart" className="heart-icon" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { isLoading} = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            {/* Remove the 'Favorites' component */}
            <Sidebar />
          </div>
          <div className="col-md-9">
            <main role="main" className="px-4">
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
              ) : (
                this.renderQuestions()
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
