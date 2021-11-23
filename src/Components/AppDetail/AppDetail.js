import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import loader from '../../Image/loader.gif';
import DetailModal from '../DetailModal/DetailModal';

const FullStack = () => {
    const { categoryPath } = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [details, setDetails] = useState({});

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
    }, [projects, categoryPath])

    

    const handleModal = (project) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.add('show-modal');
        setDetails(project);
        setIsModalOpen(true);
    }

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
            <section className="modal__container" id="modal-container">
                {
                    isModalOpen && <DetailModal details={details} key={details._id} setIsModalOpen={setIsModalOpen} setDetails={setDetails}/>
                }
            </section>
        </>
    );
};

export default FullStack;