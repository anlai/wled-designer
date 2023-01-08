import React from 'react';
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    return (
        <ul className="nav nav-pills">
            <li className="nav-item"><Link to='/'  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Designer</Link></li>
            <li className="nav-item"><Link to='/about' className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link></li>
        </ul>
        );
}

export default Navbar;