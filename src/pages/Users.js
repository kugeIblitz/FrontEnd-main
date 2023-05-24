import React, { Component } from 'react';
import Sidebar from "./Sidebar";
import { getAllUsers } from "../Api/Users";

class Users extends Component {
  state = {
    users: [],
    isLoading: true
  };

  componentDidMount() {
    this.fetchUsers();
  }
  
  fetchUsers = () => {
    getAllUsers()
      .then((response) => {
        this.setState({
          users: response.data["hydra:member"],
          isLoading: false
        });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    const { users, isLoading } = this.state;
  
    return (
      <div className="container">
        <Sidebar />
        <div>
          <h1 className="mt-3">Users</h1>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div style={{ marginLeft: "350px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Users;
