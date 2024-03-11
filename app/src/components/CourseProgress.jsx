import './CourseProgress.css';



/**
 * @param {number} props.progress Percentage from 0 to 100
 */

export default function CourseProgress(props) {
    return (
        <div className="course-progress col-4">
            <span className='label'>seu progresso</span>
            <div className="progress-border">
                <div className="progress-bar"></div>
            </div>
            <p className="progress-percent">{props.progress}%</p>
        </div>
    )
}