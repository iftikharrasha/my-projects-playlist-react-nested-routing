import React, { useState, useEffect } from 'react';
import {
    Link
} from "react-router-dom";
import { useParams } from 'react-router';
import igot from '../../Image/igot.png';
import fiverr from '../../Image/fiverr.svg';

const FullStack = () => {
    const { categoryPath } = useParams();
    
    const [projects, setProjects] = useState([]);
    const [details, setDetails] = useState([]);
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        let url;
        if(categoryPath === undefined) {
            url = `http://localhost:5000/projects/full-stack`;
        }else{
            url = `http://localhost:5000/projects/${categoryPath}`;
        }
        fetch(url)
        .then(res => res.json())
        .then(data => setProjects(data));
    }, [projects])

    

    const handleModal = (project) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.add('show-modal');
        setDetails(project);
        setTechs(project.techs);
    }

    const handleClose = (e) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.remove('show-modal');
        e.preventDefault();
    }

    return (
        <>
            <div className="app__inside">
                {
                    projects.map((project) => (
                        <div className="app__single" key={project.id}>
                            <button className="reg--24" onClick={() => handleModal(project)}>
                                <img src={project.logo} alt="logo"/>
                                <p className="lit--18">{project.title}</p>
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className="modal__container" id="modal-container">
                <div className="modal__content">
                    <div className="modal__close" title="Close" onClick={handleClose}>
                        <i className='fa fa-close'></i>
                    </div>

                    <div className="content__details">
                        <div className="content__logo">
                            <img src={details.logo} alt={igot}/>
                            <div className="content__text">
                                <p className="reg--36">{details.title}</p>
                                <a href={details.link}><button>Live Preview</button></a>
                            </div>
                        </div>
                        <div className="content__desc">
                            <h4 className="reg--36">Description</h4>
                            <p className="reg--24">{details.desc}</p>
                            <h4 className="reg--36">Tech Stack</h4>
                            <ul>
                                {
                                    techs.map(tech => (
                                        <li className="reg--24" key={details.id}>{tech.tool}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="content__ui">
                            <img src={details.ui} alt="ui" className="img-fluid"/>
                        </div>
                    </div>
                </div>

                <div className="content__extra">
                    <Link to={details.repoClient}>
                        <div className="extra__icon">
                            <img src={igot} alt={igot}/>
                            <p>Repo</p>
                        </div>
                    </Link>

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