import React, { useState, useEffect } from 'react';
import {
    Link
} from "react-router-dom";
import { useParams } from 'react-router';
// import igot from '../../Image/igot.png';
// import github from '../../Image/github.svg';
// import portfolio from '../../Image/portfolio.svg';
// import fiverr from '../../Image/fiverr.svg';
// import behance from '../../Image/behance.svg';
import loader from '../../Image/loader.gif';
import DetailModal from '../DetailModal/DetailModal';

const FullStack = () => {
    const { categoryPath } = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [details, setDetails] = useState({});
    // const [techs, setTechs] = useState([]);

    useEffect(() => {
        let url;
        if(categoryPath === undefined) {
            url = `http://localhost:5000/projects/full-stack`;
        }else{
            url = `http://localhost:5000/projects/${categoryPath}`;
        }
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setProjects(data);
        })
        .catch((error) => {
            console.log('category fetch error!', error);
        })
        .finally(() => setIsLoading(false));
    }, [projects])

    

    const handleModal = (project) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.add('show-modal');
        setDetails(project);
        setIsModalOpen(true);
        // setTechs(project.techs);
        // loadViews(project._id);
    }

    // const loadViews = (id) => {
    //     let url = `http://localhost:5000/views/${id}`;
    //     fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(projects)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         if(data.modifiedCount > 0){
    //             setDetails(projects[0]);
    //             setProjects(projects);
    //         }else{
    //             console.log('HELLOW KITTY');
    //         }
    //     })
    // }

    // const handleReact = (id) => {
    //     let url = `http://localhost:5000/reaction/${id}`;
    //     fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(projects)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         if(data.modifiedCount > 0){
    //             document.getElementById('icon-heart').style.color = 'red';
    //             setDetails(projects[0]);
    //             setProjects(projects);
    //             console.log('hitted');
    //         }else{
    //             document.getElementById('icon-heart').style.color = 'green';
    //             console.log('else hit');
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }

    return (
        <>
            <div className="app__inside">
                {
                    !isLoading && projects.map((project) => (
                                    <div className="app__single" key={project._id}>
                                        <button className="reg--24" onClick={() => handleModal(project)}>
                                            <img src={project.logo} alt="logo"/>
                                            <p className="lit--18">{project.title}</p>
                                        </button>
                                    </div>
                    ))
                }

                {
                    isLoading &&    <div className="loader">
                                        <img src={loader} alt={loader}/>
                                    </div>
                }
            </div>
            <div className="modal__container" id="modal-container">
                {
                    isModalOpen && <DetailModal details={details} key={details._id} setIsModalOpen={setIsModalOpen} setDetails={setDetails}/>
                }
            </div>

            {/* <div className="modal__container" id="modal-container">
                <div className="modal__content">
                    <div className="modal__close" title="Close" onClick={handleClose}>
                        <i className='fa fa-close'></i>
                    </div>

                    <div className="content__details">
                        <div className="content__logo">
                            <img src={details.logo} alt={igot}/>
                            <div className="content__text">
                                <p className="reg--36">{details.title}</p>
                                <a href={details.link} target="_blank" rel="noopener noreferrer"><button>Live Preview</button></a>
                            </div>
                        </div>
                        <div className="content__desc">
                            <h4 className="reg--36">Description</h4>
                            <p className="reg--24">{details.desc}</p>
                            <h4 className="reg--36">Tech Stack</h4>
                            <ul>
                                {
                                    techs.map(tech => (
                                        <li className="reg--24" key={tech.no}>{tech.tool}</li>
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
                    <Link to={details.repo} target="_blank" rel="noopener noreferrer">
                        <div className="extra__icon">
                            <img src={github} alt={github}/>
                            <p>Git Repo</p>
                        </div>
                    </Link>

                    <Link to={details.behance} target="_blank" rel="noopener noreferrer">
                        <div className="extra__icon">
                            <img src={behance} alt={behance}/>
                            <p>Behance</p>
                        </div>
                    </Link>

                    <a href="http://iftikharrasha.com/" target="_blank" rel="noopener noreferrer">
                        <div className="extra__icon">
                            <img src={portfolio} alt={portfolio}/>
                            <p>Porfolio</p>
                        </div>
                    </a>

                    <a href="https://www.fiverr.com/iftikharrasha/" target="_blank" rel="noopener noreferrer">
                        <div className="extra__icon">
                            <img src={fiverr} alt={fiverr}/>
                            <p>Fiverr</p>
                        </div>
                    </a>

                    <div className="extra__icon">
                        <button type="button" className="react" onClick={() => handleReact(details._id)}>
                            <i className="fa fa-heart" id="icon-heart"></i>
                            <p>{details.loves}</p>
                        </button>
                        <p>Likes</p>
                    </div>

                    <div className="extra__icon">
                        <button type="button" className="react">
                            <i className="fa fa-eye" id="icon-heart"></i>
                            <p>{details.views}</p>
                        </button>
                        <p>Views</p>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default FullStack;