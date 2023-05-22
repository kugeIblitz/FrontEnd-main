import React, { Component } from 'react';
import Sidebar from "./Sidebar";
import { getAllUsers } from "../Api/Users";

class Users extends Component {
  state = {
    users: [],
  };


  componentDidMount() {
    this.fetchUsers();
  }
  
  fetchUsers = () => {
    getAllUsers()
      .then((response) => {
        this.setState({
          users: response.data["hydra:member"],
        
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
       
      });
  };

  render() {
    const { users } = this.state;

    return (
      <div className='container'>
        <Sidebar />
        <div>
          <h1 className='mt-3'>Users</h1>
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Users;
