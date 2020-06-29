import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Books from './Books';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/:page?" component={Books} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
