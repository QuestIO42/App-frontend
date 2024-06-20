import logo from "../../img/logo.svg";
import lupa from "../../img/lupa.svg";
import sino from "../../img/sinoNotification.svg"
import conta from "../../img/accountIcon.svg"

import './NavHeader.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useState} from 'react';

const NavHeader = () => {

    const [search, setSearch] = useState('');
return (
    <div>
<nav className="navbar navbar-default navbar-expand-lg py-2">
            <div className="container-fluid">
                    <a className="navbar-brand mx-3" href="#">
                        <img src={logo} alt="" loading="lazy"/>
                    </a>
                    
                        <form className="d-flex">
                                    <input
                                        type="text"
                                        className=" me-2 search-input"
                                        id="search"
                                        value={search}
                                        placeholder={"pesquisar"}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                 <button
                                type="button"
                                className=" search-button mx-2 mt-1 "
                        >
                                <img src={lupa} alt="" loading="lazy"/>
                        </button>
                        </form>
                   
                   
                    <div className="d-flex justify-content-end">
                        <a href=""> <button
                                type="button"
                                className=" notification-icon my-2 py-2 px-1 mr-2 ml-2"
                        > 
                                <img src={sino} alt="" loading="lazy"/>
                        </button> </a>
                        <a href=""><button
                                type="button"
                                className=" account-icon my-2  py-2 px-1 mr-2 ml-2"
                        >
                                <img src={conta} alt="" loading="lazy"/>
                        </button></a>
                    </div>
            </div>
            
            
        </nav>
    </div>
);


}
export default NavHeader;