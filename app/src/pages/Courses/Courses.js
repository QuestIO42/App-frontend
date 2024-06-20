import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

import chapeu from "../../img/chapeu.svg";
import Footer from '../../components/Footer/Footer';
import SquareForm from '../../components/SquareForm/SquareForm';
import SquareDisplay from '../../components/SquareDisplay/SquareDisplay';
import NavHeader from '../../components/NavHeader/NavHeader';
import TestImage from '../../img/TestImage.png';
import ModalSquare from '../../components/ModalSquare/ModalSquare';
const Courses = () => {
    return (
        <div>
            <NavHeader />
            <div className="background">
                <div className="container mb-1">
                   
                    <div className=" d-flex justify-content-center flex-row">
                        <div className="mx-5  px-5 text-center">
                            <img src={chapeu} alt="chapeu"/>
                            <h1 className="title-courses mx-5 px-5">Meus cursos</h1>
                        </div>
                       
                        <div className=" mx-0 p-0 novo-curso-botao">
                            <ModalSquare/>
                    </div>
                </div>
                    </div>
                   
                    <div className="container-md-3 mx-5">
                        <div className="row mx-3">
                            <div className=" col-sm-12  col-md-6 col-lg-3 my-5">
                                
                                <div className="tamanho mx-2">
                                    <SquareDisplay imagem={TestImage} nome={'Prof. Menotti'} curso={'Portas Lógicas'}>
                                    </SquareDisplay>
                                    
                                </div>
                             
                            </div>

                            <div className="col-sm-12   col-md-6 col-lg-3  my-5">
                         
                                <div className="tamanho mx-2">
                                    <SquareDisplay imagem={TestImage} nome={'Prof. Emerson'} curso={'Verilog'}>
                                    </SquareDisplay>        
                                </div>
                           
                            </div>

                            <div className="col-sm-12  col-md-6 col-lg-3  my-5">
                            
                                <div className="tamanho mx-2">
                                    <SquareDisplay imagem={TestImage} nome={'Prof. Menotti'} curso={'Introdução a FPGA'}>
                                    </SquareDisplay>
                                    
                            
                            </div>
                            </div>
                            <div className="col-sm-12  col-md-6 col-lg-3 my-5">
                           
                                <div className="tamanho mx-2">
                                    <SquareDisplay imagem={TestImage} nome={'Prof. Emerson'} curso={'Máquinas de estado'}>
                                    </SquareDisplay>
                            
                             
                            </div>
                            </div>
                           
            
                        </div>
                    </div>
                    <Footer/>
                </div>
                
            </div>
            
          
       
     
    );
}
export default Courses;