import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { fetchProjects, fetchReviews } from '../../Redux/Slices/projectSlice';
import AppDetail from '../AppDetail/AppDetail';

const AppStore = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchReviews());
    }, [dispatch])
    
    let { path, url } = useRouteMatch();
    const [active, setActive] = useState(false);

    const categories = [
        { id: 1, name: "React Web Apps", to: "full-stack", className: "nav_item", idName: "react" },
        { id: 2, name: "PSD to HTML", to: "psd-to-html", className: "nav_item", idName: "psd" },
        { id: 3, name: "Fun With JS & API", to: "fun-with-api", className: "nav_item", idName: "api" },
        { id: 4, name: "Email Templates", to: "email-templates", className: "nav_item", idName: "email" },
        { id: 5, name: "PHP MYSQL", to: "php-mysql", className: "nav_item", idName: "pen" }
    ];

    return (
        <>
            <section className="playlist">
                <div className="wrapper">
                    <div className="playlist__content" id="playlist">
                        <h2 className="bigReg--100 text--center">My Projects Playlist</h2>
                        <div className="playlist__container">
                            <div className="playlist__sidebar">
                                <ul>
                                    {
                                        categories.map(link =>
                                            <li key={link.id} onClick={() => setActive(true)} className={`nav_link ${active === true && 'active'}`} id={link.idName}><Link to={`${url}/${link.to}`} className="reg--24">{link.name}</Link></li>
                                        )
                                    }
                                    <li className="refresh">
                                        <Link to="/dashboard"><i className="fa fa-tachometer" aria-hidden="true"> Dashboard</i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="playlist__details">
                                <Switch>
                                    <Route exact path={path}>
                                        <AppDetail/>
                                    </Route>
                                    <Route path={`${path}/:categoryPath`}>
                                        <AppDetail/>
                                    </Route>
                                </Switch>

                                <p className="redirect">Don't worry it won't redirect you! 😃</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AppStore;