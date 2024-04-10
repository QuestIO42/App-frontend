import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import chapeu from "../img/chapeu.svg";
import Footer from '../components/Footer';
import SquareForm from '../components/SquareForm';
import SquareDisplay from '../components/SquareDisplay';
import NavHeader from '../components/NavHeader';
import TestImage from '../img/TestImage.png';
import ModalSquare from '../components/ModalSquare/ModalSquare';
const Courses = () => {
    return (
        <div>
            
                
            <NavHeader />
            <div className="background">
            <div className="container">
            <ModalSquare/>
                <div className="text-center">
                   
                    <img src={chapeu} alt="chapeu" />
                    <h1 className="title-courses">Meus cursos</h1>
                     
                    <div className="row"> 
                    <div className="col-3">
                    </div>
                    </div>
                   
                </div>
        <div className="container">
            <div className="row">
            <div className="col">
                <div className="tamanho">
                    <SquareDisplay imagem={TestImage} nome={'Prof. Menotti'} curso={'Portas Lógicas'}>
                    </SquareDisplay>
                       
                </div>
            </div>
            <div className="col">
            <div className="tamanho">
                <SquareDisplay imagem={TestImage} nome={'Prof. Emerson'} curso={'Verilog'}>
                </SquareDisplay>
                       
                       </div>
                       </div>
                       <div className="col">
                <div className="tamanho">
                    <SquareDisplay imagem={TestImage} nome={'Prof. Menotti'} curso={'Introdução a FPGA'}>
                    </SquareDisplay>
                       
                </div>
            </div>
            <div className="col">
                <div className="tamanho">
                    <SquareDisplay imagem={TestImage} nome={'Prof. Emerson'} curso={'Máquinas de estado'}>
                    </SquareDisplay>
                       
                </div>
            </div>
           
            
        </div>
        </div>
        </div>
        </div>
        <Footer/>
        </div>
    );
}
export default Courses;