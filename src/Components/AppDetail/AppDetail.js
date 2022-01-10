import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import loader from '../../Image/loader.gif';
import DetailModal from '../DetailModal/DetailModal';
import { useSelector } from 'react-redux';

const FullStack = () => {
    const { categoryPath } = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectsFiltered, setProjectsFiltered] = useState([]);
    const [details, setDetails] = useState({});

    const allProjects = useSelector((state) => state.projects.projectsList);
    
    useEffect(() => {
        let filtered;
        if(categoryPath === undefined) {
            filtered  = allProjects.filter(project =>  project.category === 'full-stack');
        }else{
            filtered  = allProjects.filter(project =>  project.category === categoryPath);
        }
        setProjectsFiltered(filtered);
        setIsLoading(false);
    }, [categoryPath, allProjects])
    
    const handleModal = (project) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.add('show-modal');
        setDetails(project);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="counts">
                <p>Total Projects: {allProjects.length}</p>
                <p>Now Showing: {projectsFiltered.length}</p>
            </div>

            <div className="app__inside">
                {
                    !isLoading && projectsFiltered.map((project) => (
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
            <section className="modal__container" id="modal-container">
                {
                    isModalOpen && <DetailModal details={details} key={details._id} setIsModalOpen={setIsModalOpen} setDetails={setDetails}/>
                }
            </section>
        </>
    );
};

export default FullStack;