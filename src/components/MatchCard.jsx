import React from 'react';
import styles from './MatchCard.module.css';

const MatchCard = ({ match }) => {
  return (
    <div className={styles.matchCard}>
      <div className={styles.teams}>
        <div className={styles.team}>
          <img 
            src={match.teams.home.logo} 
            alt={match.teams.home.name} 
            loading="lazy"
            className={styles.teamLogo}
          />
          <span className={styles.teamName}>{match.teams.home.name}</span>
        </div>
        
        <div className={styles.vs}>vs</div>
        
        <div className={styles.team}>
          <img 
            src={match.teams.away.logo} 
            alt={match.teams.away.name} 
            loading="lazy"
            className={styles.teamLogo}
          />
          <span className={styles.teamName}>{match.teams.away.name}</span>
        </div>
      </div>
      
      <div className={styles.matchDetails}>
        <div className={styles.league}>{match.league.name}</div>
        <div className={styles.dateTime}>
          {new Date(match.date).toLocaleString()}
        </div>
        <div className={styles.venue}>{match.venue?.city}</div>
      </div>
    </div>
  );
};

export default React.memo(MatchCard);