import React from "react";
import {
    Link
} from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

const Home = () => {

    return (
        <>
            <main>
                <Header/>
                <section className="hero base" id="hero">
                    <div className="hero__contents text--center" id="top">
                        <h1 className="bigReg--150 my--4">Welcome to my<br />Secret base</h1>
                        <div className="hero__sub">
                            <button className="btn--1 my--4">
                                <svg width="72" height="16" viewBox="0 0 72 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="tick">
                                    <path d="M71.7071 8.67732C72.0976 8.28679 72.0976 7.65363 71.7071 7.2631L65.3431 0.899141C64.9526 0.508617 64.3195 0.508617 63.9289 0.899141C63.5384 1.28967 63.5384 1.92283 63.9289 2.31336L69.5858 7.97021L63.9289 13.6271C63.5384 14.0176 63.5384 14.6508 63.9289 15.0413C64.3195 15.4318 64.9526 15.4318 65.3431 15.0413L71.7071 8.67732ZM8.75098e-08 8.97021L71 8.97021L71 6.97021L-8.75098e-08 6.97021L8.75098e-08 8.97021Z" fill="#F9F5EF">
                                    </path>
                                </svg>
                                <svg className="circle">
                                    <circle></circle>
                                </svg>
                                <Link to="/playlist" className="reg--24">Enter the room!</Link>
                            </button>
                        </div>
                    </div>
                </section>
                <Footer/>
            </main>
        </>
    );
};

export default Home;