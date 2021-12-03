import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginForm from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import InvestedUsers from './pages/Invested-Users'
import Investments from './pages/Investments'
import Investment from './pages/Investment'
import InvestmentForm from './pages/Create-Investments'
import UpdateMining from './pages/UpdateMining';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/signup">
          <h1>signup</h1>
        </Route>
        <Route path="/dashboard">
          <Home />
        </Route>
        <Route path="/create-investment">
          <InvestmentForm />
        </Route>
        <Route path="/invested-users">
          <InvestedUsers />
        </Route>
        <Route path="/investments">
          <Investments />
        </Route>
        <Route path="/investment/:id">
          <Investment />
        </Route>
        <Route path="/user-profile/:id">
          <Profile />
        </Route>
        <Route path="/update-mining/:id">
          <UpdateMining />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
