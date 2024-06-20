
import './CourseProgress.css';



/**
 * @param {number} props.progress Percentage from 0 to 100
 */

export default function CourseProgress(props) {
    return (
        <div className="course-progress">
            <span className='label'>{props.texto}</span>
            <div className="progress-border">
                <div className="progress-bar" style={{ width: `${props.progress}%` }}></div>
            </div>
            <p className="progress-percent">{props.progress}%</p>
        </div>
    )
} 