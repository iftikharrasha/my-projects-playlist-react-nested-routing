import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import githubLogo from '../../Image/github.svg';
import portfolioLogo from '../../Image/portfolio.svg';
import fiverrLogo from '../../Image/fiverr.svg';
import behanceLogo from '../../Image/behance.svg';
import { useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';
import moment from 'moment';

const DetailModal = (props) => {
    const { _id, logo, title, link, desc, techs, ui, repo, behance, loves, views, featured } = props.details;
    const [reacts, setReacts] = useState(loves);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const { loggedInUser, signInWithGoogle, logoutUser, authError } = useAuth();

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        let url = `https://still-peak-02811.herokuapp.com/views/${_id}`;
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
                console.log('API Stoinks! 😃');
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

    
    useEffect(() => {
        let url = `https://still-peak-02811.herokuapp.com/reviews/${_id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setReviews(data));
    }, [reviews])

    //google login
    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    //love react
    const handleReact = (id) => {
        const loading = toast.loading('Please wait ...');
        let liked = false;

        const alreadyLiked = addToStorage(id, liked);

        if(alreadyLiked){
            toast.dismiss(loading);
            toast("You've already liked it!", {
                icon: '👏',
            });
        }else{
            let url = `https://still-peak-02811.herokuapp.com/reaction/${id}`;
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
                    toast.success('Thanks for the appreciation! 😃');
                    setReacts(reacts+1);
                }else{
                    toast.dismiss(loading);
                    toast("You've already liked it!", {
                        icon: '👏',
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    //local storage utilities
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

    //review system
    const ratingCount = {
        size: 0,
        count: 5,
        color: "black",
        activeColor: "red",
        value: 0,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: newValue => {
            setRating(newValue);
        }
    };

    const date = new Date().toISOString().slice(0, 10);
    const dateId = date.replace(/-/g, "");
    const author = loggedInUser.name;
    const img = loggedInUser.photo;
    const commentRef = useRef();

    const handleReview = (e) => {
        const loading = toast.loading('Please wait ...');
        toast.dismiss(loading);
        const comment = commentRef.current.value;
        const projectId = _id;
        // const userId = loggedInUser.id;
        const status = 'verified';

        const newReview = { projectId, author, img, comment, rating, status, dateId };
        fetch('https://still-peak-02811.herokuapp.com/add-review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newReview)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.insertedId){
                toast.dismiss(loading);
                toast.success("Successfully added your review!", {
                    position: "bottom-center"
                });
                e.target.reset();
            }else{
                toast.dismiss(loading);
                toast.error('Something went wrong!');
            }
        })

        e.preventDefault();
    }

    const handleClose = (e) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.remove('show-modal');
        props.setIsModalOpen(false);
        e.preventDefault();
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
                                behance &&  <a href={behance} target="_blank" rel="noopener noreferrer">
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
                                        {
                                            featured ? <p>{reviews.length + 1}</p>
                                            : <p>{reviews.length}</p>
                                        }
                                        
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

                            {/* {
                                (featured && reviews) ? ''
                                : <p>There is no review in this project yet!</p>
                            } */}

                            {
                                featured &&  <div className="comment__card">
                                                    <div className="comment__item">
                                                        <div className="comment__desc">
                                                            <div className="desc__top">
                                                                <div className="comment__img">
                                                                    <img src={featured[0].img} alt={featured[0].author}/>
                                                                </div>
                                                                <div>
                                                                    <span className="reg--24 user">{featured[0].author}</span>
                                                                    <span className="verified">{featured[0].status}</span>
                                                                    <div className="story-rating">
                                                                        <ReactStars {...ratingCount} value={featured[0].rating} edit={false}/>
                                                                        <span className="reg--18 time">{moment(featured[0].dateId, "YYYYMMDD").fromNow()}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p>{featured[0].comment}</p>
                                                        </div>
                                                    </div>
                                                </div>
                            }
                            


                            {reviews.map((review) => (
                            <div className="comment__card" key={review._id}>
                                <div className="comment__item">
                                    <div className="comment__desc">
                                        <div className="desc__top">
                                            <div className="comment__img">
                                                <img src={review.img} alt={review.name}/>
                                            </div>
                                            <div>
                                                <span className="reg--24 user">{review.author}</span>
                                                <span className="verified">{review.status}</span>
                                                <div className="story-rating">
                                                    <ReactStars {...ratingCount} value={review.rating} edit={false}/>
                                                    <span className="reg--18 time">{moment(review.dateId, "YYYYMMDD").fromNow()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p>{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                            ))}

                            {
                                loggedInUser.isSignedIn ?   <div className="comment__box">
                                                                <form onSubmit={handleReview}>
                                                                    <div className="comment__bar">
                                                                        <h3 className="reg--24">
                                                                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                            Commenting as <span>{loggedInUser.name},</span>
                                                                        </h3>
                                                                        <button onClick={logoutUser}><i className="fa fa-sign-out" aria-hidden="true"></i> Sign Out</button>
                                                                    </div>
                                                                    <textarea ref={commentRef} rows="3" cols="40" className="reg--24" required placeholder="Write your review here . . ."></textarea>
                                                                    <span className="story-rating">
                                                                        <h3 className="reg--24">Leave your Rating:</h3>
                                                                        <ReactStars {...ratingCount} />
                                                                    </span>
                                                                    <button className="reg--24">Submit</button>
                                                                </form>
                                                            </div>

                                                        :   <div className="account__creation">
                                                                <h3 className="text--center reg--24">Sign in with google to drop your review! 😃</h3>
            
                                                                <div className="social__login">
                                                                    <button onClick={handleGoogleSignIn}>
                                                                        <img src="https://rh-london.web.app/static/media/google.154ddb64.svg" alt="google"/>
                                                                        <span className="reg--24">Continue with Google</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                            }
                            <Toaster
                                position="top-center"
                                reverseOrder={false}
                            />
                        </div>
                    </div>
                </div>
        </>
    );
};

export default DetailModal;