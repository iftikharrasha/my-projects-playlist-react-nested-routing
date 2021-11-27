import React from 'react';
import {
    Link
} from "react-router-dom";

const Header = () => {
    return (
        <>
           <header className="header">
               <div className="wrapper">
                    <nav>
                        <h2 className="bar--18 text--center">
                            <Link to="/">RASHA'21</Link>
                        </h2>
                    </nav>
               </div>
            </header> 
        </>
    );
};

export default Header;