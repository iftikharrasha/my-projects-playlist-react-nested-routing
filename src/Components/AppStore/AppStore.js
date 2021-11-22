import React from 'react';
import { useState } from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import AppDetail from '../AppDetail/AppDetail';

const AppStore = () => {
    let { path, url } = useRouteMatch();
    const [active, setActive] = useState(false);

    const categories = [
        { id: 1, name: "React Web Apps", to: "full-stack", className: "nav_item", idName: "react" },
        { id: 2, name: "PSD to HTML", to: "psd-to-html", className: "nav_item", idName: "psd" },
        { id: 3, name: "API Integration", to: "api-integration", className: "nav_item", idName: "api" },
        { id: 4, name: "Email Templates", to: "email-templates", className: "nav_item", idName: "email" },
        { id: 5, name: "UI/UX Design", to: "ui-ux-design", className: "nav_item", idName: "ui" },
        { id: 6, name: "Codepens", to: "my-pens", className: "nav_item", idName: "pen" }
    ];

    return (
        <>
            <section className="playlist">
                <div className="wrapper">
                    <div className="playlist__content" id="playlist">
                        <h2 className="bigReg--100 text--center">Front End Playlist</h2>
                        <div className="playlist__container">
                            <div className="playlist__sidebar">
                                <ul>
                                    {
                                        categories.map(link =>
                                            <li key={link.id} onClick={() => setActive(true)} className={`nav_link ${active === true && 'active'}`} id={link.idName}><Link to={`${url}/${link.to}`} className="reg--24">{link.name}</Link></li>
                                        )
                                    }
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