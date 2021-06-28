import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { SideBar } from './SideBar/SideBar';
import { Home } from './Pages/Home/Home';
import { Terrain } from './Pages/Terrain/Terrain';
import { Info } from './Pages/Info/Info';
import { Riders } from './Pages/Riders/Riders';

function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/riders">
              <Riders />
            </Route>
            <Route exact path="/terrain">
              <Terrain />
            </Route>
            <Route exact path="/info">
              <Info />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
