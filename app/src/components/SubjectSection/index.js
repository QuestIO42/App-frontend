import SubjectTitle from '../SubjectTitle';

import LightBulb from '../../img/light-bulb.svg';
import './SubjectSection.css';


export default function SubjectSection(props) {
    return (
        <div className="section">
            <div className="section-title">
                <img src={LightBulb} alt="" />
                <h4>Principais portas lógicas</h4>
            </div>

            <div className="subjects">
                <SubjectTitle />
                <SubjectTitle />
            </div>
        </div>
    )
}