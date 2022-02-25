import './App.css';
import Header from './containers/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UsersList from './containers/Users/UserList';
import UserDetail from './containers/Users/UserDetails';


function App() {
  return (
    <div className="App">

      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={UsersList} />
          <Route path="/user/:userId" exact component={UserDetail} />
          <Route> 404 Not Found!</Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
