// Libraries imports here
import React, { useState, useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

// import react contexts
import { UserProvider, AuthContext, UserContext } from "./contexts/UserContext";

// Page Imports Here
import Leaderboard from "./pages/Leaderboard";
import Splash from "./pages/Splash";
// import SignUp from './pages/SignupPage';

// Component Imports Here
import Header from "./components/Header";
import GamesList from "./pages/GamesList";

// CSS Imports Here
import "./styles/main.css";
import AuthModal from "./components/AuthModal";

// ReactGA.set({
// userId: this.props.context.state.user.name,
// userEmail: this.props.context.state.user.email
// any data that is relevant to the user session
// that you would like to track with google analytics
// });

// Google Analytics Setup
ReactGA.initialize("UA-151338746-1");
ReactGA.pageview(window.location.pathname + window.location.search);
// ReactGA.modalview("./components/AuthModal");

// Initialize google analytics page view tracking
const history = createBrowserHistory();

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <UserProvider>
          <UserContext.Consumer>
            {context => (
              <>
                <Header />
                <div className="page-content">
                  {context.state.showAuthModal && (
                    <AuthModal
                      loginView={context.state.showLogin}
                      formMessage={context.state.loginModalMessage}
                    />
                  )}
                  <div
                    className={`${context.state.showAuthModal ? "faded" : ""}`}
                    id="fadeable-section"
                    type="User"
                    onClick={
                      context.state.showAuthModal ? context.hideModal : false
                    }
                  >
                    <Switch>
                      <Route
                        path="/"
                        exact
                        component={Splash}
                        history={history}
                      />
                      <Route
                        path="/games"
                        exact
                        component={GamesList}
                        history={history}
                      />
                      <Route
                        path="/leaderboard"
                        component={Leaderboard}
                        history={history}
                      />
                      <Route
                        path="/login"
                        render={props => <AuthModal modal={false} />}
                        showLogin={true}
                      />
                      <Route
                        path="/signup"
                        render={props => <AuthModal modal={false} />}
                        showLogin={true}
                      />
                    </Switch>
                  </div>
                </div>
              </>
            )}
          </UserContext.Consumer>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
