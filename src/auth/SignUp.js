import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.css";

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const extractUsername = (email) => {
    const atIndex = email.indexOf("@");
    return email.slice(0, atIndex);
  };

  const signUp = (e) => {
    e.preventDefault();
    const username = extractUsername(email);

    if (password.length < 6) {
      notifyError("Password must be at least 6 characters long.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userData = {
          username: username,
          email: email,
          password: password,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        // Make the POST request to the API
        fetch("https://localhost:8000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("User created:", data);
            history.push("/");
          })
          .catch((error) => {
            console.log("Error creating user:", error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          notifyError("Invalid email address.");
        } else if (error.code === "auth/email-already-in-use") {
          notifyError("Email already in use.");
        } else {
          console.log("Error:", error);
        }
      });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-content">
        <ToastContainer />
        <form onSubmit={signUp} className="sign-up-form">
          <h1>Create new Account</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sign-up-input"
          ></input>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="sign-up-input"
          ></input>
          <button type="submit" className="sign-up-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
