import { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { TitleBar } from './TitleBar/TitleBar';
import { SideBar } from './SideBar/SideBar';
import { Map } from './Pages/Map/Map';
import { Info } from './Pages/Map/Info';
import { Riders } from './Pages/Riders/Riders';
import './App.css';

function App() {
  const [active, setActive] = useState('RIDER');
  const [infoDisplayed, setInfoDisplayed] = useState(null);
  
  useEffect(() => {
    const display = JSON.parse(window.localStorage.getItem('infoDisplayed')); 
    if (display === null) {
      setInfoDisplayed(false);
    } else {
      setInfoDisplayed(display);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('infoDisplayed', infoDisplayed);
  }, [infoDisplayed]);

  if (infoDisplayed === null) {
    return (<div>loading</div>);
  }

  return (
    <Router>
      <div className="App">
        <TitleBar />
        <SideBar active={active} setActive={setActive} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              {
                infoDisplayed? 
                  <Riders setActive={setActive} />:
                  <Redirect to="/info" />
              }
            </Route>
            <Route exact path="/map">
              <Map setActive={setActive} />
            </Route>
            <Route exact path="/info">
              <Riders />
              <Info setActive={setActive} setInfoDisplayed={setInfoDisplayed} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
