import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SquareForm from '../components/SquareForm';
import '../App.css';
import axios from 'axios';


// This css is only being used for the "esqueceu sua senha" button
// Not sure if creating a separate css is the best decision, might change later
import './Register.css';

import logo from "../img/logoLogin.svg";
import Input from '../components/Input';

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const handleRegister = async () => { //Lógica de Autenticação
        try {
            const response = await axios.post('http://localhost:9000/api/user/register', {
            username: username,
            email: email,
            password: password,
            confirm_password: confirm_password
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        };

    return (
        <div>
            <nav className="nav-login">
                <a className="navbar-brand" href="/"><img src={logo} className="" alt="logo"/></a>
            </nav>

            <div className="container mb-2">

                <div className="row">
                    <div className="col-3">
                    </div>
                    <div className="col-6">
                        <SquareForm>
                            <div className="card-inner">
                                <div className="card-login">

                                    <h3 className="title">Cadastro</h3>

                                    <div className="login-body">
                                        <form className="form">
                                            <Input name="nome de usuário" setValue={setUsername} value={username}/>
                                            <Input name="e-mail" setValue={setEmail} value={email}/>
                                            <Input name="senha" setValue={setPassword} value={password} type="password">
                                                <div className="text-end">
                                                    
                                                </div>
                                            </Input>
                                            <Input name="confirmar senha" setValue={setConfirmPassword} value={confirm_password} type="password"/>
                                            <div className="text-center">
                                                <button
                                                    type="button"
                                                    className="default-btn"
                                                    onClick={ handleRegister}
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
                        </SquareForm>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;