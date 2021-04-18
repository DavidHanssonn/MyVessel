import React, {FC} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './components/home';
import VesselMap from './components/vessel/vesselmap';
import './App.scss'


const PageNotFound = () => {
  return <Redirect to="/" />
};

const App : FC = () => {
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/map">
              <VesselMap />
        </Route>
        <Route path="" component={PageNotFound} />
      </Switch>
    </div>
  </Router>
  );
}

export default App