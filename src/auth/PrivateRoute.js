import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          // Loading state, show a loading indicator or component
          return <div>Loading...</div>;
        } else if (user) {
          // Authenticated, allow access to the component
          return <Component {...props} />;
        } else {
          // Not authenticated, redirect to sign in
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
