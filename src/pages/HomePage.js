import React, { Component } from "react";
import { getAllQuestions, deleteQuestion } from "../Api/Question";
import { Link } from "react-router-dom";
import "./spinnerLoader.css";
import filledHeartIcon from "../images/filledHeartIcon.png";
import heartIcon from "../images/heartIcon.png";
import Sidebar from "./Sidebar";
import AuthDetails from "../auth/AuthDetails";

class QuestionsPage extends Component {
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
        // Question deleted successfully, update the state or perform any necessary actions
        console.log(`Question with ID ${id} deleted.`);
        // Refresh the questions list after deletion
        this.fetchQuestions();
      })
      .catch((error) => {
        // Handle any errors that occurred during the deletion process
        console.error(`Error deleting question with ID ${id}:`, error);
      });
  };

  handleFavoriteClick = (questionId) => {
    const { favorites } = this.state;
    if (favorites.includes(questionId)) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((id) => id !== questionId);
      this.setState({ favorites: updatedFavorites });
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, questionId];
      this.setState({ favorites: updatedFavorites });
    }
  };

  renderQuestions() {
    const { favorites } = this.state;

    return (
      <div className="container">
                 

        {this.state.questions.map((question) => (
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
                style={{ marginLeft: "15px"}}
              >
                Delete Question
              </button>
              <button
               
                className="btn btn-success"
                style={{ marginLeft: "15px"}}
              >
                Answer Question
              </button>
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
                  <img
                    src={heartIcon}
                    alt="Heart"
                    className="heart-icon"
                  />
                )}
              </button>
            </div>
          </div>
        ))}
        
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
  
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <header className="d-flex justify-content-between align-items-center">
              <h1 className="mt-3">Top Questions</h1>
              <AuthDetails />
            </header>
  
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

export default QuestionsPage;
