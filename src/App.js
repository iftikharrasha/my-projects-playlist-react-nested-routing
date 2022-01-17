import { React } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './Sass/style.css';
import PlayList from './Pages/Playlist.js';
import AuthProvider from './Contexts/AuthProvider/AuthProvider';
import Home from './Pages/Home';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';
import Dashboard from './Pages/SecretBase/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
        <AuthProvider>
          <Router>
            <Route render={({location}) => (
                <Switch location={location}>
                    <Route path="/playlist">
                        <PlayList/>
                    </Route>
                    <Route path="/home">
                        <Home/>
                    </Route>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <PrivateRoute path="/secret-base">
                        <Dashboard/>
                    </PrivateRoute>
                    <Route path="*">
                    </Route>
                </Switch>
            )} />
          </Router>
        </AuthProvider>
    </div>
  );
}

export default App;
