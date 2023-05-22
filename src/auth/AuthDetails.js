import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import "./btn.css";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        // Redirect to SignIn page after successful sign out
        history.push("/signin");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="auth-details">
      {authUser ? (
        <div className="auth-details__signed-in">
          <p className="auth-details__signed-in-text">Welcome! {authUser.email}</p>
          <button className="auth-details__sign-out-button" onClick={userSignOut}>Sign Out?</button>
        </div>
      ) : (
        <p className="auth-details__signed-out-text">Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
