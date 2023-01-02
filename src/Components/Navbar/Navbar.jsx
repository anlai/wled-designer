import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <ul className="nav nav-pills">
            <li className="nav-item"><Link to='/' className="nav-link">Designer</Link></li>
            <li className="nav-item"><Link to='/about' className="nav-link">About</Link></li>
        </ul>
        );
}

export default Navbar;