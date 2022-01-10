import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import home from '../../Image/home.svg';
import account from '../../Image/account.svg';
import shops from '../../Image/shops.svg';
import products from '../../Image/products.svg';
import services from '../../Image/services.svg';

const SideBar = () => {
    const { loggedInUser } = useAuth();

    return (
        <>
            <nav className="sidenav">
                <div className="navbar-inner">
                    <ul className="navbar-nav">
                        <li className="nav-item py-2 px-4">
                            <Link className="nav-link" to="/dashboard">
                                <img src={home} alt={home} className="img-fluid mb-1"/>
                                <span className="nav-link-text px-2">{loggedInUser}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default SideBar;