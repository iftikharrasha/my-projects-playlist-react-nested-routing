import React, { useRef, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import githubLogo from '../../Image/github.svg';
import portfolioLogo from '../../Image/portfolio.svg';
import fiverrLogo from '../../Image/fiverr.svg';
import behanceLogo from '../../Image/behance.svg';
import useAuth from '../../Hooks/useAuth';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, postReacts, postViews } from '../../Redux/Slices/projectSlice';

const DetailModal = (props) => {
    const { _id, views, loves, techs } = props.details;

    const [details, setDetails] = useState({});
    const [reviews, setReviews] = useState([]);
    const allProjects = useSelector((state) => state.projects.projectsList);
    const allReviews = useSelector((state) => state.projects.reviewsList);
    useEffect(() => {
        const thisProject  = allProjects.find(project =>  project._id === _id);
        const thisReview  = allReviews.filter(review =>  review.projectId === _id);
        setDetails(thisProject);
        setReviews(thisReview);
    }, [_id, allProjects, allReviews, details, reviews])

    const [reacts, setReacts] = useState(loves);
    const [rating, setRating] = useState(0);
    const { loggedInUser, signInWithGoogle, logoutUser } = useAuth();

    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postViews(props.details));

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
    }, [views])

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
            dispatch(postReacts(details));
            setReacts(reacts+1);
            toast.dismiss(loading);
            toast.success('Thanks for the appreciation! 😃');
            document.getElementById('icon-heart').style.color = 'red';
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

    const date = new Date().toISOString();
    const author = loggedInUser.name;
    const img = loggedInUser.photo;
    const commentRef = useRef();

    const handleReview = (e) => {
        const loading = toast.loading('Please wait ...');
        toast.dismiss(loading);
        const comment = commentRef.current.value;
        const projectId = _id;
        const status = 'verified';

        const newReview = { projectId, author, img, comment, rating, status, date };
        if(dispatch(addReview(newReview))){
            toast.dismiss(loading);
            toast.success("Successfully added your review!", {
                position: "bottom-center"
            });
            e.target.reset();
        }else{
            toast.dismiss(loading);
            toast.error('Something went wrong!');
        }

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
                            <img src={details.logo} alt={details.logo}/>
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
                                        <li className="reg--24" key={tech.No+(Math.random() + 1).toString(36).substring(7)}>{tech.tool}</li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="content__extra">
                            <a href={details.repo} target="_blank" rel="noopener noreferrer">
                                <div className="extra__icon">
                                    <img src={githubLogo} alt={githubLogo}/>
                                    <p>Git Repo</p>
                                </div>
                            </a>

                            {
                                details.behance &&  <a href={details.behance} target="_blank" rel="noopener noreferrer">
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
                                    <p>{details.views}</p>
                                </button>
                                <p>Views</p>
                            </div>

                            <a href="#reviews">
                                <div className="extra__icon">
                                    <button type="button" className="react">
                                        <i className="fa fa-star star" id="icon-heart"></i>
                                        {
                                            details.featured ? <p>{reviews.length + 1}</p>
                                            : <p>{reviews.length}</p>
                                        }
                                    </button>
                                    <p>Reviews</p>
                                </div>
                            </a>
                        </div>
                        <div className="content__ui">
                            <img src={details.ui} alt="ui" className="img-fluid"/>
                        </div>

                        <div className="content__review" id="reviews">
                            <h4 className="reg--36">Reviews</h4>

                            {/* {
                                (featured && reviews) ? ''
                                : <p>There is no review in this project yet!</p>
                            } */}

                            {
                                details.featured &&  <div className="comment__card">
                                                    <div className="comment__item">
                                                        <div className="comment__desc">
                                                            <div className="desc__top">
                                                                <div className="comment__img">
                                                                    <img src={details.featured[0].img} alt={details.featured[0].author}/>
                                                                </div>
                                                                <div>
                                                                    <span className="reg--24 user">{details.featured[0].author}</span>
                                                                    <span className="verified">{details.featured[0].status}</span>
                                                                    <div className="story-rating">
                                                                        <ReactStars {...ratingCount} value={details.featured[0].rating} edit={false}/>
                                                                        <span className="reg--18 time">{moment(details.featured[0].dateId).fromNow()}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p>{details.featured[0].comment}</p>
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
                                                    <span className="reg--18 time">{moment(review.date).fromNow()}</span>
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
                                                                        <h3 className="reg--24">Select your Rating:</h3>
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