import { useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { TitleBar } from './TitleBar/TitleBar';
import { SideBar } from './SideBar/SideBar';
import { Map } from './Pages/Map/Map';
import { Info } from './Pages/Map/Info';
import { Riders } from './Pages/Riders/Riders';
import './App.css';

function App() {
  const [active, setActive] = useState('RIDER');
  return (
    <Router>
      <div className="App">
        <TitleBar />
        <SideBar active={active} setActive={setActive} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Riders setActive={setActive}/>
            </Route>
            <Route exact path="/map">
              <Map setActive={setActive} />
            </Route>
            <Route exact path="/info">
              <Map/>
              <Info setActive={setActive}/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
