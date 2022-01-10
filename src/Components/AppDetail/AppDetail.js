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
    const [reviews, setReviews] = useState([]);
    const [details, setDetails] = useState({});

    const allProjects = useSelector((state) => state.projects.projectsList);
    const allReviews = useSelector((state) => state.projects.reviewsList);
    
    useEffect(() => {
        let filteredProjects;
        if(categoryPath === undefined) {
            filteredProjects  = allProjects.filter(project =>  project.category === 'full-stack');
        }else{
            filteredProjects  = allProjects.filter(project =>  project.category === categoryPath);
        }
        setProjectsFiltered(filteredProjects);
        setIsLoading(false);
    }, [categoryPath, allProjects, allReviews])
    
    const handleModal = (project) => {
        let filteredReviews;
        filteredReviews  = allReviews.filter(review =>  review.projectId === project._id);

        setReviews(filteredReviews);
        setDetails(project);
        setIsModalOpen(true);

        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.add('show-modal');
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
                    isModalOpen && <DetailModal details={details} reviews={reviews} key={details._id} setIsModalOpen={setIsModalOpen} setDetails={setDetails}/>
                }
            </section>
        </>
    );
};

export default FullStack;