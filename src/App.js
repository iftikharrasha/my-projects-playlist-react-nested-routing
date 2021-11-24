import { React } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './Sass/style.css';
import PlayList from './Pages/Playlist.js';
import AuthProvider from './contexts/AuthProvider/AuthProvider';

function App() {
  return (
    <div className="App">
        <AuthProvider>
          <Router>
              <Switch>
                  <Route path="/playlist">
                      <PlayList/>
                  </Route>
                  <Route path="/home">
                      
                  </Route>
                  <Route exact path="/">

                  </Route>
                  <Route path="*">
                  </Route>
              </Switch>
          </Router>
        </AuthProvider>
    </div>
  );
}

export default App;
