import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Games from './pages/Games';
import Leaderboard from './pages/Leaderboard';
import SignUp from './pages/SignupPage';
import Header from './components/Header';
import GamesList from './pages/GamesList';
import './styles/main.css';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact component={SignUp} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/login' component={SignUp} />
            <Route path='/gameslist' component={GamesList} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
