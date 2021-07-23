import { useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { TitleBar } from './TitleBar/TitleBar';
import { SideBar } from './SideBar/SideBar';
import { Map } from './Pages/Map/Map';
import { Riders } from './Pages/Riders/Riders';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <TitleBar />
        <SideBar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Riders/>
            </Route>
            <Route exact path="/map">
              <Map/>
            </Route>
            <Route exact path="/info">
              <Map/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
