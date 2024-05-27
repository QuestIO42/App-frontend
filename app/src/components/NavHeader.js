import logo from "../img/logo.svg";
import lupa from "../img/lupa.svg";

import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useState} from 'react';

const NavHeader = () => {

    const [search, setSearch] = useState('');
return (
    <div>
        <nav className="navbar-default">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="" loading="lazy"/>
                    </a>
                    </div>

                    <div className="col d-flex justify-content-center text-center">
                        <form className="nav-search">
                            <div className="input-group">
                                <div className="mb-5">
                                    <input
                                        type="text"
                                        className="search-input"
                                        id="search"
                                        value={search}
                                        placeholder={"Pesquisar"}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="search-button"
                                >
                                    <img src={lupa} alt="" loading="lazy"/>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="col-2">
                    </div>

                </div>
            </div>
        </nav>
    </div>
);

}
export default NavHeader;