import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer/Footer';
import Home from './Home-page/Home';
const Layout = () => {
    return (
        <>
        {/* <Home/> */}
        <Outlet/>
        {/* <Footer/> */}
            
        </>
    );
} 

export default Layout;
