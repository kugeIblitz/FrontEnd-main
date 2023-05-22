import React, { Component } from "react";
import { getAllQuestions } from "../Api/Question";
import Nav from "./Nav";

export default class QuestionsPage extends Component {
  state = {
    questions: [],
  };
  componentDidMount = () => {
    getAllQuestions().then((response) => {
      this.setState({
        questions: response.data["hydra:member"],
      });
      console.log("title : " + this.state.questions);
    });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Nav />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <h1 className="mt-3">Table of users</h1>
            <table className="table mt-2 table-bordered">
              <tr className="p-2">
                <th>Id</th>
                <th>Name</th>
                <th>Content</th>
                <th>createdAt</th>
                <th>View</th>
              </tr>
              {this.state.questions.map((e) => (
                <tr className="p-2">
                  <td className="py-2">{e.id}</td>
                  <td className="py-2">{e.title}</td>
                  <td className="py-2">{e.content}</td>
                  <td className="py-2">{e.createdAt}</td>
                  {/* <Link to={'/users/'+e.id} className="btn btn-primary  ">View</Link> */}
                  {/* <td><button onClick={()=>this.viewUser(e)} className="btn btn-outline-primary">View</button></td>
                      <td><button onClick={()=>this.deleteUser(e)} className="btn btn-outline-danger">Delete</button></td> */}
                </tr>
              ))}
            </table>
          </main>
        </div>
      </div>
    );
  }
}
