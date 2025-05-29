import React, { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import MatchCard from './components/MatchCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const url = `${import.meta.env.VITE_API_URL}?date=${formattedDate}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_API_KEY,
          'x-rapidapi-host': import.meta.env.VITE_API_HOST
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.status}`);
      }
      
      const data = await response.json();
      setMatches(data.response || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) return <div className={styles.loading}>Loading matches...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Upcoming Basketball Matches</h1>
        <div className={styles.datePickerContainer}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
            dateFormat="yyyy-MM-dd"
            className={styles.datePicker}
            popperClassName={styles.datePickerPopper}
          />
        </div>
        <p>Games scheduled for {formatDate(selectedDate)}</p>
      </header>
      
      <div className={styles.matchesContainer}>
        {matches.length > 0 ? (
          matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))
        ) : (
          <div className={styles.noMatches}>No matches scheduled for this date.</div>
        )}
      </div>
      
      <footer className={styles.footer}>
        <p>Data provided by <a href="https://www.api-sports.io/" target="_blank">API-Sports.io</a></p>
      </footer>
    </div>
  );
}

export default React.memo(App);