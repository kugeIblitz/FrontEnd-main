import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignIn.css";

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      notifyError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      notifyError("Please enter your password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        history.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          notifyError("Incorrect password.");
        } else if (error.code === "auth/invalid-email") {
          notifyError("Invalid email address.");
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
    <div className="sign-in-container">
      <div className="form-container">
        <form onSubmit={signIn} className="sign-in-form">
          <h1>Log In</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sign-in-input"
          ></input>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="sign-in-input"
          ></input>
          <button type="submit" className="sign-in-button">
            Log In
          </button>
          <Link to="/signup" className="register-link">
            Register
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
