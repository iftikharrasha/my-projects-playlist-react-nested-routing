import { React } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './Sass/style.css';
import AuthProvider from './Contexts/AuthProvider/AuthProvider';
import Home from './Pages/Home';
import Login from './Pages/Login';
import PlayList from './Pages/Playlist.js';
import Dashboard from './Pages/Dashboard/Dashboard';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';

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
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <PrivateRoute path="/dashboard">
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
