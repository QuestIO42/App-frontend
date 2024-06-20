import RankingUser from "../RankingUser/RankingUser";
import './Ranking.css';
import TrophyIcon from '../../img/trophy.svg';

export default function Ranking() {
    return (

        <div className="ranking-geral-container">

            <div className="ranking-geral-titulo">
                ranking <img src={TrophyIcon} alt="" />
            </div>


            <div className="ranking-container">
                <RankingUser
                    rank={1}
                    userName="Marie Curie"
                    college="Universidade de Paris" />
                <RankingUser
                    rank={1}
                    userName="Marie Curie"
                    college="Universidade de Paris" />
                <RankingUser
                    rank={1}
                    userName="Marie Curie"
                    college="Universidade de Paris" />
                <RankingUser
                    rank={1}
                    userName="Marie Curie"
                    college="Universidade de Paris" />
                <RankingUser
                    rank={150}
                    userName="Usuário"
                    college="Universidade de Paris" />
                <hr />
                <RankingUser
                    rank={150}
                    userName="Usuário"
                    college="Universidade Federal de Sao Carlos" />
            </div>

        </div>


    );
}