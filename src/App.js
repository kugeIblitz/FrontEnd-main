import React from 'react';
import { BrowserRouter, Link, Switch, Route  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Users from './pages/Users';
import QuestionsPage from './pages/QuestionsPage';
import HomePage from './pages/HomePage';
import AskQuestion from './pages/AskQuestion';
import QuestionDetailsPage from "./pages/QuestionDetailsPage";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import PrivateRoute from "./auth/PrivateRoute";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import AnimatedBackground from "./pages/AnimatedBackground";

import './App.css';




const App = () => {
  return (

    <BrowserRouter>
      <div className='App'>
        <div className='header'>
        <AnimatedBackground />

          <Link className='navbar-brand'>
          </Link>
          <div className='authentication-container'>
            {/* Update the login/logout buttons as per your authentication implementation */}
          </div>
        </div>
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          {/* <Route path='/AuthDetails' component={AuthDetails} /> */}
          <PrivateRoute path='/questions/:id' component={QuestionDetailsPage} />
          <PrivateRoute path='/question' component={QuestionsPage} />
          <PrivateRoute path='/AskQuestion' component={AskQuestion} />
          <Route path='/About' component={About} />
          <Route path='/users' component={Users} />
          <Route path='/Favorites' component={Favorites} />
          <PrivateRoute exact path='/' component={HomePage} />
        </Switch>
      </div>
      
    </BrowserRouter>
    
  );
};

export default App;
