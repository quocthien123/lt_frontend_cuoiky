
import styles from './UpcomingMatches.module.css';


export  function UpcomingMatchesCell( {match} : {match: any} ) {
    return (
        <div>
            <div>
                <h4> {match.starttime} </h4>
            </div>
            <div className={styles.home_away_cell}>
                <div className={styles.cell}>
                                {match.homeTeam.logo && <img src={match.homeTeam.logo} width="20" alt={match.homeTeam.name} />}
                                {match.homeTeam.name} - 
                            </div>
                <br />
                <div className={styles.cell}>
                                {match.awayTeam.logo && <img src={match.awayTeam.logo} width="20" alt={match.awayTeam.name} />}
                                {match.awayTeam.name}  - 
                            </div>            
            </div>
        </div>
    )
}
export default function UpcomingMatchesLayout({matches} : {matches : any[]}) {
    return (
        <div>
            <div className={styles.nav_layout}>
                {matches.slice(0,7).map((g, i) => (
                      <div>
                            <UpcomingMatchesCell match = {g}/>
                            </div>
                ))}
            </div>
        </div>
    )
}