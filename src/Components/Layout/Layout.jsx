import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";

const Layout = ({ children }) => {

  return (
    <>
      <header class="d-flex flex-wrap justify-content-center py-3 border-bottom">
        <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <span class="fs-4">WLED Designer</span>
        </span>
        <Navbar></Navbar>
      </header>

      <main><Outlet></Outlet></main>

      <footer class="pt-5 my-5 text-muted border-top">
          Created by the <a href="https://github.com/anlai">anlai</a> &middot; &copy; 2022
      </footer>
    </>
  );

}

export default Layout;