import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css';

import logo from "../img/logo.svg";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => { //Lógica de Autenticação

    }

    return (
        <div className="container">
           <nav className="navbar navbar-expand-sm">
               <a className="navbar-brand" href="/"><img src={logo} class="" alt="logo"/></a>
           </nav>


            <div className="row">
                <div className="col-3">
                </div>
              <div className="col-6">
                <div className="card-default">
                    <div className="card-inner">
                        <div className="card-login">

                            <h3 className="title">Login</h3>

                            <div className="login-body">
                                <form className="form">
                                    <div className="mb-4">
                                        <label htmlFor="username" className="form-label">usuário ou email</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">senha</label>
                                        <input
                                            type="password"
                                            className="form-input"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="text-end">
                                            <button
                                                type="button"
                                                className="text-button">esqueceu a senha?
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            type="button"
                                            className="default-btn"
                                            onClick={handleLogin}
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="text-center">
                            <a href='/register'><button
                                type="button"
                                className="text-button">Ainda não é cadastrado? <u>Cadastre-se</u>
                            </button>
                            </a>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
    );
};

export default Login;