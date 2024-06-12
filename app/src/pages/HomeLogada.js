import React from 'react';
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
const HomeLogada = () => {

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
                                            olá, Usuário!
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