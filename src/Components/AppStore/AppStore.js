import React from 'react';
import { useState } from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import FullStack from '../Apps/FullStack/FullStack';
import PsdToHtml from '../Apps/PsdToHtml/PsdToHtml';

const AppStore = () => {
    let { path, url } = useRouteMatch();
    const [isActive, setIsActive] = useState(true);

    return (
        <>
            <section className="playlist">
                <div className="wrapper">
                    <div className="playlist__content" id="playlist">
                        <h2 className="bigReg--100 text--center">Playlist</h2>
                        <div className="playlist__container">
                            <div className="playlist__sidebar">
                                <ul>
                                    <li><Link to={`${url}/full-stack`} className="reg--24">Full Stack</Link></li>
                                    <li><Link to={`${url}/psd-to-html`} className="reg--24">PSD to HTML</Link></li>
                                    <li><Link to={`${url}`} className="reg--24">Email Templates</Link></li>
                                    <li><Link to={`${url}`} className="reg--24">API Integration</Link></li>
                                    <li><Link to={`${url}`} className="reg--24">UI/UX</Link></li>
                                </ul>
                            </div>
                            <div className="playlist__details">
                                <Switch>
                                    <Route exact path={path}>
                                        
                                    </Route>
                                    <Route path={`${path}/full-stack`}>
                                        <FullStack/>
                                    </Route>
                                    <Route path={`${path}/psd-to-html`}>
                                        <PsdToHtml/>
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AppStore;