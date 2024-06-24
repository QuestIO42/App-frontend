import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Footer from '../components/Footer';
import SquareForm from '../components/SquareForm';
import SquareDisplay from '../components/SquareDisplay';
import NavHeader from '../components/NavHeader';
import RectangleBox from '../components/RectangleBox/RectangleBox';
import CourseProgress from '../components/CourseProgress';
import '../components/CourseProgress';
import LevelProgress from '../components/LevelProgress/LevelProgress';
import imagem from '../img/imagem(1).png';
import {jwtDecode} from 'jwt-decode';



const HomeLogada = () => {
    const [username, setUsername] = useState('Usuário');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const user = jwtDecode(token);
        const id = user.user_id;
        const config = {
            headers: { Authorization: `${token}` }
        };
      

        axios.get('http://localhost:9000/api/user/'+id, config)
            .then(response => {
                setUsername(response.data.username);
            })
            .catch(error => {
                console.error(error);
            });
    }
);

    return (
        <div>
            
            <NavHeader />
            <div className='container'>
                <div className='tamanho-box'>
                    <div className='row'>
                        <div className='col-9'>
                            <RectangleBox
                                bgcolor={'#ffffff'}
                                boxcolor={'#000000'}
                                fontcolor={'#454545'}
                                boxshadow={'#000000'}
                                bgcolor2={'#000000'}
                                fontcolor2={'#ffffff'}
                            >
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className='col-8'>
                                        <div className='texto-box border'>
                                            olá, {username} !
                                        </div>
                                        <div>
                                        <div className='sizeaa'> </div>
                                            <CourseProgress progress={35} texto='xp' />
                                            
                                    </div>
                                    </div>
                                    <div className='col-4'>
                                        <LevelProgress circleWidth={100} />
                                        </div>
                                </div>
                                </div>
                            </RectangleBox>
                            </div>
                            </div>
                            </div>

                            <div className='container'> 
                            <div className='row'>
                                <div className='col-9 meus-cursos'>
                                    <h2 className=''>Meus cursos</h2>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <SquareDisplay imagem={imagem}/>
                                        </div>
                                        <div className='col-4'>
                                            <SquareDisplay imagem={imagem} />
                                        </div>
                                        <div className='col-4'>
                                            <SquareDisplay imagem={imagem} />
                                        </div>
                                    </div>
                                    <button
                                            type="button"
                                            className="default-btn"
                                        >
                                            ver mais
                                        </button>
                                    <div className='Labs'>
                                        <h2 className=''>Labs</h2>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <SquareDisplay imagem={imagem} />
                                            </div>
                                            <div className='col-4'>
                                                <SquareDisplay imagem={imagem} />
                                            </div>
                                            <div className='col-4'>
                                                <SquareDisplay imagem={imagem} />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="default-btn"
                                        >
                                            ver mais
                                        </button>
                                    </div>
                                </div>
                     
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
    };
    
    export default HomeLogada;