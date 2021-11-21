import React from "react";
import AppStore from '../Components/AppStore/AppStore';
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

const Home = () => {

    return (
        <>
            <main>
                <Header/>
                <AppStore/>
                <Footer/>
            </main>
        </>
    );
};

export default Home;