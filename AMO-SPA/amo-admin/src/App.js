import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React, { Suspense } from 'react';
import {PrivateRoute} from './components/PrivateRoute';
import CallbackPage from './components/callback/CallbackPage';

const TheLayout = React.lazy(() => import('./components/Layout/TheLayout'));
const Welcome = React.lazy(() => import('./features/welcome/welcome'));
const AccessDenied = React.lazy(() => import('./features/accessdenied/AccessDenied'));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


function App() {
  return (
    <Router>   
          <Suspense fallback={loading}>
            <Switch>
            <Route exact path="/accessdenied" render={props => <AccessDenied {...props}/>} />
              <Route exact path="/welcome" render={props => <Welcome {...props}/>} />
              <Route exact path="/callback" component={CallbackPage} />
              <PrivateRoute path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </Suspense>
      </Router>
  );
}

export default App;
