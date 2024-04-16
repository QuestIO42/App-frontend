import Eye from './eye-selected.svg';
import EyeSelected from './eye.svg';
import { useState } from 'react';

import './SubjectTitle.css';


export default function SubjectTitle() {


    const [enabled, setEnabled] = useState(false);


    return (
        <div className="subject-title">
            <span>And, or, Not</span>
            <img src={
                enabled ? Eye : EyeSelected
            } alt={
                enabled ? "Ativo" : "Inativo"
            } onClick={() => {setEnabled(!enabled)}}/>
        </div>
    )
}