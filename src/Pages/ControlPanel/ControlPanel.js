import React from 'react';
import Dashboard from '../../Components/Dashboard/Dashboard';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';

const ControlPanel = () => {
    return (
        <div>
            <Header/>
            <Dashboard/>
            <Footer/>
        </div>
    );
};

export default ControlPanel;