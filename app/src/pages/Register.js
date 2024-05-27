import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css';


// This css is only being used for the "esqueceu sua senha" button
// Not sure if creating a separate css is the best decision, might change later
import './Register.css';

import logo from "../img/logo.svg";
import Input from '../components/Input';

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => { //Lógica de Autenticação

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

                                <h3 className="title">Cadastro</h3>

                                <div className="login-body">
                                    <form className="form">
                                        <Input name="nome de usuário" setValue={setUsername} value={username}/>
                                        <Input name="e-mail" setValue={setEmail} value={email}/>
                                        <Input name="senha" setValue={setPassword} value={password} type="password">
                                            <div className="text-end">
                                                <button
                                                    type="button"
                                                    className="text-button link">esqueceu a senha?
                                                </button>
                                            </div>
                                        </Input>
                                        <Input name="confirmar senha" setValue={setConfirmPassword} value={confirmPassword} type="password"/>
                                        <div className="text-center">
                                            <button
                                                type="button"
                                                className="default-btn"
                                                onClick={handleRegister}
                                            >
                                                Cadastrar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="text-center">
                                <a href='/'><button
                                    type="button"
                                    className="text-button">Já possui conta? <u>Login</u>
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

export default Register;