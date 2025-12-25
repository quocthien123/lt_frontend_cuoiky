
import { useState } from 'react';
import styles from './StandingPage.module.css';

export interface RankingItem {
    teamName : string,
    teamLogo: string,
    hieuSo: string, 
    wins: string,
    draws : string,
    losses: string,
    points: string,
}
export interface standingModel {
    rankings : RankingItem[]
}
export function StandingsTable( {rankings} : standingModel) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Stt</th>
                    <th>Đội</th>
                    <th>Hiệu số</th>
                    <th>Thắng</th>
                    <th>Hòa</th>
                    <th>Thua</th>
                    <th>Điểm</th>
                </tr>
            </thead>
            <tbody>
                {rankings.map((team: any, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                {team.teamLogo && <img src={team.teamLogo} width="20" alt={team.nameTeam} />}
                                {team.nameTeam}
                            </div>
                        </td>
                        <td>{team.hieu_so}</td>
                        <td>{team.win}</td>
                        <td>{team.draws}</td>
                        <td>{team.losses}</td>
                        <td><strong>{team.point}</strong></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export interface RankingGroup {
    league_name : string,
    league_nation: string,
    standings :  RankingItem[],
}
export default function Standings({ rankings }: { rankings: RankingGroup[] }) {
    const [selected, setSelected] = useState(0);
    return (
        <div>
            <div style={{display: 'flex', gap: '8px', marginBottom: '12px'}}>
                {rankings.map((g, i) => (
                    <button key={i} onClick={() => setSelected(i)} className={i === selected ? styles.activeBtn : ''}>
                        {g.league_nation}
                    </button>
                ))}
            </div>
            <div className={styles.standings}>
               <StandingsTable rankings={rankings[selected].standings} />
            </div>
        </div>
    )
}