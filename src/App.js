import Navbar from './NavBar';
import Home from './Course/Home';
import About from './About/About';
import Riders from './Riders/Riders';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/live">
              <Riders />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
