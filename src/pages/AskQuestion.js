import React, { Component } from "react";
import { postQuestion } from "../Api/Question";
import "./askquestion.css";
import Sidebar from "./Sidebar";

export default class AskQuestion extends Component {
  state = {
    title: "",
    content: "",
    questionSubmitted: false, // Track if the question has been submitted
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, content } = this.state;
    postQuestion({ title: title, content: content })
      .then((response) => {
        console.log('Question posted');
        this.setState({ questionSubmitted: true, title: "", content: "" }); // Set questionSubmitted to true and clear title and content
      })
      .catch((error) => {
        console.error(error);
        alert('Error submitting question. Please try again later.');
      });
  };
  

  render() {
    const { title, content, questionSubmitted } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <main role="main">
              <div className="row">
                <div className="col">
                  <h1 className="display-4 mt-4 mb-5" style={{ marginLeft: "280px" }}>
                    Ask a Question?!
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  {questionSubmitted ? ( // Display the alert if questionSubmitted is true
                    <div className="alert alert-success" role="alert">
                      Question sent successfully!
                    </div>
                  ) : null}
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="title" className="h5">
                        Question Title
                      </label>
                      <input
                        type="text"
                        className="form-control shorter-input"
                        id="title"
                        name="title"
                        value={title}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="content" className="h5">
                        Question Content
                      </label>
                      <textarea
                        className="form-control"
                        id="content"
                        name="content"
                        rows="6"
                        value={content}
                        onChange={this.handleInputChange}
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
