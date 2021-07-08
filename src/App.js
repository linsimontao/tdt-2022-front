import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { TitleBar } from './TitleBar/TitleBar';
import { SideBar } from './SideBar/SideBar';
import { Home } from './Pages/Home/Home';
import { Riders } from './Pages/Riders/Riders';

function App() {
  return (
    <Router>
      <div className="App">
        <TitleBar />
        <SideBar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home sub="home"/>
            </Route>
            <Route exact path="/riders">
              <Riders />
            </Route>
            <Route exact path="/terrain">
              <Home sub="terrain" />
            </Route>
            <Route exact path="/live">
              <Home sub="live"/>
            </Route>
            <Route exact path="/info">
              <Home sub="info" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
