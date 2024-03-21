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

const Courses = () => {
    return (
        <div>
            
                
            <NavHeader />
            <div className="background">
            <div className="container">
          
                <div className="text-center">
                    <img src={chapeu} alt="chapeu" />
                    <h1 className="title-courses">Meus cursos</h1>
                    <div className="row"> 
                    <div className="col-3">
                    </div>
                    </div>

                </div>
        <div className="container">
            <div className="tamanho">
                <SquareDisplay imagem={TestImage} nome={'Prof. Menotti'} curso={'Portas Lógicas'}>
                    
                </SquareDisplay>
                
                       </div>
            <div className="row">
                <div className="col-3">
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