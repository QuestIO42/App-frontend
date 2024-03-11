import './RankingUser.css'
import RankingUserLogo from './icon_account circle.svg';


/**
 * 
 * @param {string} props.userName The user Name, not username, the user Name, actual Name
 * @param {string} props.college The user college
 * @param {number} props.rank The rank position
 * @returns 
 */
export default function RankingUser(props) {
    return (
        <div className="ranking-user-container">
            <h1 className="ranking-number">{props.rank}º</h1>
            <img src={RankingUserLogo} alt="User Image" className="ranking-user-logo col-4"/>
            <div className="ranking-stats">
                <h1 className="ranking-user-name">{props.userName}</h1>
                <p className="ranking-user-college">{props.college}</p>
            </div>
        </div>
    );
}