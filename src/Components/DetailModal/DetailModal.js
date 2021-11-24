import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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

        //checking liked for color
        const exists = getStorage();
        
        let color_cart = {};
        if (exists) {
            color_cart = JSON.parse(exists);
            if (color_cart[_id]) {
                document.getElementById('icon-heart').style.color = 'red';
            }
            else {
                document.getElementById('icon-heart').style.color = '$primary';
            }
        }
    }, [])

    const handleReact = (id) => {
        const loading = toast.loading('Please wait ...');
        let liked = false;

        const alreadyLiked = addToStorage(id, liked);

        if(alreadyLiked){
            toast.dismiss(loading);
            toast.error("You've already liked it! 😃");
        }else{
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
                    toast.dismiss(loading);
                    toast.success('Thanks for the appreciation!');
                    setReacts(reacts+1);
                }else{
                    toast.dismiss(loading);
                    toast.error("You've already liked it! 😃");
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    const addToStorage = (id, liked) => {
        const exists = getStorage();
        
        let react_cart = {};
        if (!exists) {
          react_cart[id] = 1;
          liked = false;
        }
        else {
          react_cart = JSON.parse(exists);
          if (react_cart[id]) {
            const newCount = react_cart[id] + 1;
            react_cart[id] = newCount;
            liked = true;
          }
          else {
            react_cart[id] = 1;
            liked = false;
          }
        }
        updateStorage(react_cart);
        return liked;
    }
    
    const getStorage = () => localStorage.getItem('liked_id');

    const updateStorage = cart => {
        localStorage.setItem('liked_id', JSON.stringify(cart));
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

                        <div className="content__extra">
                            <a href={repo} target="_blank" rel="noopener noreferrer">
                                <div className="extra__icon">
                                    <img src={githubLogo} alt={githubLogo}/>
                                    <p>Git Repo</p>
                                </div>
                            </a>

                            {
                                behance && <a href={behance} target="_blank" rel="noopener noreferrer">
                                                <div className="extra__icon">
                                                    <img src={behanceLogo} alt={behanceLogo}/>
                                                    <p>Behance</p>
                                                </div>
                                            </a>
                            }
                            

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
                                <button type="button" className="react" onClick={() => handleReact(_id)} id="react-btn">
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

                            <a href="#reviews">
                                <div className="extra__icon">
                                    <button type="button" className="react">
                                        <i className="fa fa-star star" id="icon-heart"></i>
                                        <p>{views}</p>
                                    </button>
                                    <p>Reviews</p>
                                </div>
                            </a>
                        </div>
                        <div className="content__ui">
                            <img src={ui} alt="ui" className="img-fluid"/>
                        </div>

                        <div className="content__review" id="reviews">
                            <h4 className="reg--36">Reviews</h4>
                            <div class="comment--card">
                                <div class="comment--item my-5">
                                    <div class="comment--img">
                                        <img src={portfolioLogo} alt={portfolioLogo}/>
                                    </div>
                                    <div class="comment--desc">
                                        <span class="bigReg--18">James Washington</span>
                                        <span class="verified">Verified</span>
                                        <div class="comment--rating">
                                            <span class="reg--18 mr-2">
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star-half-alt"></i>
                                            </span>
                                            <span class="reg--18">2 Hours Ago</span>
                                        </div>
                                        <p class="reg--14 mt-4 mb-sm-5 mb-2">
                                            This was great, I wasn't sure what to pick so I figured I couldn't go wrong with a watch for my girlfriend. I got it in the mail and gave it to her as a surprise gift - totally blew her away. Then i told her how I got it and she started looking for the survey everywhere until she found it - she got herself a body building supplement she's been wanting and she just had to pay for shipping. Really amazing..
                                        </p>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
        </>
    );
};

export default DetailModal;