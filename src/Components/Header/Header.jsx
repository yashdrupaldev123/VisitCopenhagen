import React, { useEffect, useRef, useState } from 'react'
import './Header.css'
import Logo from '../Logo/Logo'
import Menu from '../Menu/Menu'
import { Link, useLocation } from 'react-router-dom'
import Button from '../Button/Button'
import SearchBox from '../SearchBox/SearchBox'
import './HeaderAdmin.css'
import axios from 'axios'
// import { Slide } from 'react-awesome-reveal'
const Header = () => {
        // let location = useLocation();
        let headerRef = useRef();
        let [searchBoxOpen, setSearchBoxOpen] = useState(false);
        let [headerMenuTop,setHeaderMenuTop] = useState([]);
        let [headerMenuBottom,setHeaderMenuBottom] = useState([]);
        let [headerTopError, setHeaderTopError] = useState("");
        let [headerBottomError, setHeaderBottomError] = useState("");

        useEffect(()=>{

                async function getHeaderTopMenuLinks(menuKey){
                        try{
                                let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/menu?menuKey=${menuKey}`);
                                let dataObj = response.data;
                                setHeaderMenuTop(dataObj.data.menuLinks);
                        } 
                        catch(error){
                                console.log(error.message);
                                setHeaderTopError(error.message);
                        }
                }
                async function getHeaderBottomMenuLinks(menuKey){
                        try{
                                let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/menu?menuKey=${menuKey}`);
                                let dataObj = response.data;
                                setHeaderMenuBottom(dataObj.data.menuLinks);
                        } 
                        catch(error){
                                setHeaderBottomError(error.message);
                        }
                }
                getHeaderTopMenuLinks("Main Navigation Top")
                getHeaderBottomMenuLinks("Main Navigation Bottom");
        },[])


        useEffect(() => {
                window.addEventListener('scroll', () => {
                        if (scrollY > 50) {
                                if(headerRef)
                                headerRef.current.classList.add("fixed");
                        } else {
                                if(headerRef){
                                headerRef.current.classList.remove("fixed");
                                headerRef.current.classList.add("no-fixed");
                                }

                        }
                })
        })
        const closeSearch = (close = false) => {
                if (close) {
                        setSearchBoxOpen(false);
                        document.body.classList.remove("no-overflow");
                }
        }
        const searchFunction = () => {
                setSearchBoxOpen(true);
                document.body.classList.add("no-overflow");
        }

        const HeaderTopMenuFallback = [
                {
                        url: '/',
                        title: 'The official guide to Copenhagen',
                        active: true
                },
                {
                        url: '/beyond-copenhagen',
                        title: 'Beyond Copenhagen'
                },
                {
                        url: '/copenhagen-card',
                        title: 'Copenhagen Card'
                },
                {
                        url: '/admin/dashboard',
                        title: 'Admin Dashboard'
                },
        ];

        const HeaderBottomMenuFallback = [
                {
                        url: '/see-and-do',
                        title: 'See & do'
                },
                {
                        url: '/eat-and-drink',
                        title: 'Eat & drink'
                },
                {
                        url: '/city-areas',
                        title: 'City areas'
                },
                {
                        url: '/planning',
                        title: 'Planning'
                },
                {
                        url: '/beyond-copenhagen',
                        title: 'Beyond Copenhagen'
                },
                {
                        url: '/copenpay',
                        title: 'CopenPay'
                },

        ];

        const searchIconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18.508 18.508" width="18"><path d="M 12.264 2.111 C 10.856 0.704 9.164 0 7.188 0 C 5.21 0 3.518 0.704 2.11 2.111 C 0.704 3.52 0 5.211 0 7.187 c 0 1.977 0.704 3.67 2.111 5.077 c 1.408 1.407 3.1 2.111 5.076 2.111 c 1.708 0 3.22 -0.54 4.538 -1.617 l 5.705 5.75 l 1.078 -1.078 l -5.75 -5.705 c 1.078 -1.318 1.617 -2.83 1.617 -4.537 c 0 -1.977 -0.704 -3.67 -2.111 -5.077 Z m -9.12 1.034 C 4.254 2.007 5.6 1.437 7.188 1.437 c 1.588 0 2.943 0.562 4.066 1.685 c 1.123 1.123 1.684 2.478 1.684 4.066 c 0 1.587 -0.561 2.942 -1.684 4.065 c -1.123 1.123 -2.478 1.684 -4.066 1.684 c -1.587 0 -2.942 -0.561 -4.065 -1.684 C 2 10.13 1.437 8.775 1.437 7.187 c 0 -1.587 0.57 -2.934 1.708 -4.042 Z" fill-rule="evenodd" stroke="none" stroke-width="1"></path></svg>
        `;

        return (
                <>
                        {searchBoxOpen && <SearchBox closeFun={closeSearch} />}
                        <header ref={headerRef}>
                                <div className="container">
                                        <div className="row">
                                                <div className="col-sm-2 header-left">
                                                        <Logo />
                                                </div>
                                                <div className="col-sm-10 header-right">
                                                        <div className="header-top">

                                                                { 
                                                                        (headerTopError == "" || headerTopError != "") ? <Menu menulinks={HeaderTopMenuFallback} className="header-top-menu" />
                                                                        : <Menu menulinks={headerMenuTop} className="header-top-menu" />
                                                                
                                                                }
                                                        </div>
                                                        <div className="header-bottom">
                                                                <div className="row">
                                                                        <div className="col-sm-10">
                                                                                {
                                                                               (headerBottomError == "" || headerBottomError != "") ? <Menu menulinks={HeaderBottomMenuFallback} className="header-bottom-menu" />
                                                                        : <Menu menulinks={headerMenuBottom} className="header-bottom-menu" />
                                                                                }
                                                                        </div>
                                                                        <div className="col-sm-2 header-bottom-right">
                                                                                <div className="total-trip">
                                                                                        <Link to="/total-trips" title="total-trip-link">
                                                                                                <p>My Trip <span><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 27 24" version="1.1"><path d="M24.1734375,1.734375 C21.1253906,-0.796875 16.4162109,-0.416666667 13.4999939,2.515625 C10.5837891,-0.416666667 5.87460938,-0.802083333 2.8265625,1.734375 C-1.1390625,5.03125 -0.558984375,10.40625 2.26757813,13.2552083 L11.5171875,22.5625 C12.0445313,23.09375 12.7511719,23.390625 13.4999939,23.390625 C14.2541016,23.390625 14.9554688,23.0989583 15.4828125,22.5677083 L24.7324219,13.2604167 C27.5537109,10.4114583 28.1443359,5.03645833 24.1734375,1.734375 Z M22.9289063,11.5 L13.6792969,20.8072917 C13.5527344,20.9322917 13.4472656,20.9322917 13.3207031,20.8072917 L4.07109375,11.5 C2.14628906,9.5625 1.75605469,5.89583333 4.45605469,3.65104167 C6.50742188,1.94791667 9.67148438,2.203125 11.6542969,4.19791667 L13.5,6.05729167 L15.3457031,4.19791667 C17.3390625,2.19270833 20.503125,1.94791667 22.5439453,3.64583333 C25.2386719,5.890625 24.8378906,9.578125 22.9289063,11.5 L22.9289063,11.5 Z" fill="white" fill-rule="nonzero" stroke="none" stroke-width="1"></path></svg></span></p>
                                                                                        </Link>

                                                                                </div>
                                                                                <div className="menu">
                                                                                        <div>
                                                                                                <Button ctaFunction={searchFunction} className="search-btn" icon={searchIconSvg} />
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                        </div>
                                                </div>

                                        </div>
                                </div>
                        </header>
                </>

        )
}

export default Header
