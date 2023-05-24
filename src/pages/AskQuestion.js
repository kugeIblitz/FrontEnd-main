import React, { Component } from "react";
import { postQuestion } from "../Api/Question";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import "./askquestion.css";
import Sidebar from "./Sidebar";

export default class AskQuestion extends Component {
  state = {
    title: "",
    content: "",
    photo: null,
    questionSubmitted: false,
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handlePhotoChange = (event) => {
    const file = event.target.files[0];
    this.setState({ photo: file });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, content, photo } = this.state;

    const storage = getStorage();
    const storageRef = ref(storage, `photos/${title}`);

    uploadBytes(storageRef, photo)
      .then(() => {
        console.log("Photo uploaded successfully");

        const questionData = {
          title: title,
          content: content,
          photoURL: `https://storage.googleapis.com/${storage.bucket}/${storageRef.fullPath}`,
        };

        postQuestion(questionData)
          .then((response) => {
            console.log("Question posted");
            this.setState({
              questionSubmitted: true,
              title: "",
              content: "",
              photo: null,
            });
          })
          .catch((error) => {
            console.error(error);
            alert("Error submitting question. Please try again later.");
          });
      })
      .catch((error) => {
        console.error("Error uploading photo", error);
        alert("Error uploading photo. Please try again.");
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
                  {questionSubmitted ? (
                    <div className="alert alert-success" role="alert">
                      Question asked successfully!
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
                    <div className="form-group">
  <label htmlFor="photo" className="h5" >
    Upload Photo
  </label>
  <input
    type="file"
    id="photo"
    name="photo"
    onChange={this.handlePhotoChange}
    accept="image/*"
    style={{ display: 'none' }}
  />
  <label htmlFor="photo" className="custom-file-upload">
    <i className="fa fa-cloud-upload" style={{ marginLeft: "7px" }}></i>Choose File
  </label>
  <span className="file-name">{this.state.photoName}</span>
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
