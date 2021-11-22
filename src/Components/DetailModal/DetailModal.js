import React, { useState } from 'react';
import {
    Link
} from "react-router-dom";
import githubLogo from '../../Image/github.svg';
import portfolioLogo from '../../Image/portfolio.svg';
import fiverrLogo from '../../Image/fiverr.svg';
import behanceLogo from '../../Image/behance.svg';
import { useEffect } from 'react';

const DetailModal = (props) => {
    const {_id, logo, title, link, desc, techs, ui, repo, behance, loves, views} = props.details;
    const [reacts, setReacts] = useState(loves);

    const handleClose = (e) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.remove('show-modal');
        props.setIsModalOpen(false);
        e.preventDefault();
    }

    useEffect(() => {
        let url = `http://localhost:5000/views/${_id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(props.details)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                props.setDetails(props.details);
            }else{
                console.log('Problem in view Count fetch!');
            }
        })
    }, [reacts])


    const handleReact = (id) => {
        let url = `http://localhost:5000/reaction/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(props.details)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                document.getElementById('icon-heart').style.color = 'red';
                setReacts(props.details.loves+1);
            }else{
                document.getElementById('icon-heart').style.color = 'green';
                console.log('Problem in react count fetch!');
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            
                <div className="modal__content">
                    <div className="modal__close" title="Close" onClick={handleClose}>
                        <i className='fa fa-close'></i>
                    </div>

                    <div className="content__details">
                        <div className="content__logo">
                            <img src={logo} alt={logo}/>
                            <div className="content__text">
                                <p className="reg--36">{title}</p>
                                <a href={link} target="_blank" rel="noopener noreferrer"><button>Live Preview</button></a>
                            </div>
                        </div>
                        <div className="content__desc">
                            <h4 className="reg--36">Description</h4>
                            <p className="reg--24">{desc}</p>
                            <h4 className="reg--36">Tech Stack</h4>
                            <ul>
                            {
                                    techs.map(tech => (
                                        <li className="reg--24" key={tech.No}>{tech.tool}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="content__ui">
                            <img src={ui} alt="ui" className="img-fluid"/>
                        </div>
                    </div>
                </div>

                <div className="content__extra">
                    <Link to={repo} target="_blank" rel="noopener noreferrer">
                        <div className="extra__icon">
                            <img src={githubLogo} alt={githubLogo}/>
                            <p>Git Repo</p>
                        </div>
                    </Link>

                    <Link to={behance} target="_blank" rel="noopener noreferrer">
                        <div className="extra__icon">
                            <img src={behanceLogo} alt={behanceLogo}/>
                            <p>Behance</p>
                        </div>
                    </Link>

                    <a href="http://iftikharrasha.com/" target="_blank" rel="noopener noreferrer">
                        <div className="extra__icon">
                            <img src={portfolioLogo} alt={portfolioLogo}/>
                            <p>Porfolio</p>
                        </div>
                    </a>

                    <a href="https://www.fiverr.com/iftikharrasha/" target="_blank" rel="noopener noreferrer">
                        <div className="extra__icon">
                            <img src={fiverrLogo} alt={fiverrLogo}/>
                            <p>Fiverr</p>
                        </div>
                    </a>

                    <div className="extra__icon">
                        <button type="button" className="react" onClick={() => handleReact(_id)}>
                            <i className="fa fa-heart" id="icon-heart"></i>
                            <p>{reacts}</p>
                        </button>
                        <p>Likes</p>
                    </div>

                    <div className="extra__icon">
                        <button type="button" className="react">
                            <i className="fa fa-eye" id="icon-heart"></i>
                            <p>{views}</p>
                        </button>
                        <p>Views</p>
                    </div>
                </div>
        </>
    );
};

export default DetailModal;