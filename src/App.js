import { React } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './Sass/style.css';
import PlayList from './Pages/Playlist.js';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
