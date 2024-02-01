import React from "react";
import { NavLink } from 'react-router-dom';

function Layout({ children }) {

    let [activeLink, setActiveLink] = React.useState('home');

    const getClassName = (link) => {
        return link === activeLink ? 'nav-link px-2 text-secondary' : 'nav-link px-2 text-white';
    }

    return (
        <>
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="logo" width="30" height="24" />
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><NavLink to="/" onClick={() => setActiveLink('home')} className={() => getClassName('home')}>Home</NavLink></li>
                    <li><NavLink to="/menu" onClick={() => setActiveLink('menu')} className={() => getClassName('menu')}>Menu</NavLink></li>
                    <li><a href="#" className="nav-link px-2 text-white">Orders</a></li>
                    <li><a href="#" className="nav-link px-2 text-white">Customers</a></li>
                    <li><a href="#" className="nav-link px-2 text-white">Reports</a></li>
                    </ul>

                    <div className="text-end">
                        <button type="button" className="btn btn-outline-light me-2">Logout</button>
                    </div>
                </div>
            </div>
        </header>
        {children}
        </>
    );
}

export default Layout;