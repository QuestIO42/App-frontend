import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css';

import chapeu from "../img/chapeu.svg";
import SquareDisplay from '../components/SquareDisplay';
import NavHeader from '../components/NavHeader';
import TestImage from '../img/TestImage.png';

const Courses = () => {
    return (
        <div>
            <NavHeader />
            <div className="container">

                <div className="text-center">
                    <img src={chapeu} alt="chapeu" />
                    <h1 className="title">Meus Cursos</h1>


                </div>
                        <SquareDisplay imagem={TestImage} />
                        <SquareDisplay imagem={TestImage} />
            </div>
        </div>

    );
}
export default Courses;