import 'bootstrap/dist/css/bootstrap.min.css';

import '../../App.css';
import './Course.css';


import NavHeader from '../../components/NavHeader';
import Ranking from '../../components/Ranking';
import Section from '../../components/SubjectSection';
import CircuitoImpresso from '../../img/circuito-impresso.png';
import CourseProgress from '../../components/CourseProgress';

const Course = () => {

    return (
        <div className="container">
            <NavHeader />
            <div className='up'>
                <div className='voltar'>
                    <a href="../">&lt; voltar</a>
                    <img src={CircuitoImpresso} alt="" />
                </div>
                <button className="default-btn editar">editar</button>
                <h1><b>Portas Lógicas</b></h1>
                <button className='default-btn'>práticas em verilog</button>
            </div>
            <CourseProgress progress={35}/>
            <div className='main'>
                <div className="sections">
                    <Section />
                    <Section />
                </div>
                <Ranking />
            </div>
        </div>
    )

}
export default Course;