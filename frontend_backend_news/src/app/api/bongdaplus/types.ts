
export interface UpcomingMatch {
  link: string;
  starttime: string;        
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
}
export interface Article {
  source_Link: string;
  title: string;
  child_Article: ChildArticle[];
}
export interface ChildArticle{
    child_title: string;
  child_source_link : string;

}
export interface News {
  title: string;
  link: string;
  imageUrl: string;
  category: string;
  root: string
}

export interface GocNhin {

}

export interface LeagueRanking {
  leagueId: string;
  leagueName: string;
  updatedAt: number;
  standings: TeamStat[];
}

export interface TeamStat {
  rank: number; 
  teamName: string;  
  logo: string;   
  daChoi: number;
  win: number;         
  draw: number;        
  loss: number;      
  hieuSo: string;   
  points: number;      
}