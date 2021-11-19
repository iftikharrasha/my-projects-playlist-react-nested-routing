import React from 'react';
import {
    Link
} from "react-router-dom";
import igot from '../../../Image/igot.png';
import rh_london from '../../../Image/rh-london-ui.webp';

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
                            <img src={igot} alt={igot}/>
                            <div className="content__text">
                                <p className="reg--36">RH-London</p>
                                <a href="#"><button>Live Preview</button></a>
                            </div>
                        </div>
                        <div className="content__desc">
                            <h4 className="reg--54">Description</h4>
                            <p className="reg--24">Built using MERN Stack with React JS and SASS for front end, EXPRESS JS as backend, deployed the server side on Heroku and hosted the client side on Firebase with firebase authentications.</p>
                        </div>
                        <div className="content__thumb">
                            <img src={rh_london} alt="rh_london" className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FullStack;