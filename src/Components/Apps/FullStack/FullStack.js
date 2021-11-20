import React from 'react';
import {
    Link
} from "react-router-dom";
import rh_logo from '../../../Image/rh-london.png';
import igot from '../../../Image/igot.png';
import rh_london from '../../../Image/rh-london-ui.webp';
import fiverr from '../../../Image/fiverr.svg';

const FullStack = () => {
    const handleModal = (e) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.add('show-modal');

        e.preventDefault();
    }

    const handleClose = (e) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.remove('show-modal');

        e.preventDefault();
    }

    return (
        <>
            <div className="app__inside">
                <div className="app__single">
                    <button className="reg--24" onClick={handleModal}>
                        <img src={igot} alt={igot}/>
                        <p className="lit--18">IGotThings</p>
                    </button>
                </div>

                <div className="app__single">
                    <button className="reg--24" onClick={handleModal}>
                        <img src={rh_logo} alt={rh_logo}/>
                        <p className="lit--18">RH-London</p>
                    </button>
                </div>
            </div>

            <div className="modal__container" id="modal-container">
                <div className="modal__content">
                    <div className="modal__close" title="Close" onClick={handleClose}>
                        <i className='fa fa-close'></i>
                    </div>

                    <div className="content__details">
                        <div className="content__logo">
                            <img src={rh_logo} alt={igot}/>
                            <div className="content__text">
                                <p className="reg--36">RH-London</p>
                                <a href="#"><button>Live Preview</button></a>
                            </div>
                        </div>
                        <div className="content__desc">
                            <h4 className="reg--36">Description</h4>
                            <p className="reg--24">Built using MERN Stack with React JS and SASS for front end, EXPRESS JS as backend, deployed the server side on Heroku and hosted the client side on Firebase with firebase authentications.</p>
                            <h4 className="reg--36">Tech Stack</h4>
                            <ul>
                                <li className="reg--24">REACT JS</li>
                                <li className="reg--24">SASS</li>
                                <li className="reg--24">BOOTSTRAP</li>
                                <li className="reg--24">FIREBASE</li>
                                <li className="reg--24">EXPRESS JS</li>
                                <li className="reg--24">MONGODB</li>
                                <li className="reg--24">GIT & GITHUB</li>
                                <li className="reg--24">VSCODE</li>
                            </ul>
                        </div>
                        <div className="content__thumb">
                            <img src={rh_london} alt="rh_london" className="img-fluid"/>
                        </div>
                    </div>
                </div>

                <div className="content__extra">
                    <div className="extra__icon">
                        <img src={igot} alt={igot}/>
                        <p>Repo</p>
                    </div>

                    <div className="extra__icon">
                        <img src={igot} alt={igot}/>
                        <p>Porfolio</p>
                    </div>

                    <div className="extra__icon">
                        <img src={fiverr} alt={fiverr}/>
                        <p>Fiverr</p>
                    </div>

                    <div className="extra__icon">
                        <img src={fiverr} alt={fiverr}/>
                        <p>Behance</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FullStack;