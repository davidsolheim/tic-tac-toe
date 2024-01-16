// src/components/Leaderboard.js
import React from 'react';

function Leaderboard({ leaderboard }) {
  console.log('Leaderboard prop:', leaderboard);
   // Check if leaderboard is an array before trying to map over it
   if (!Array.isArray(leaderboard)) {
    // Handle the case where leaderboard is not an array
    // Thiscould be a simple message or returning null to render nothing
console.error('leaderboard prop is not an array', leaderboard);
return <div>No leaderboard data available.</div>;
}
  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Initials</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{entry.initials}</td>
              <td>{entry.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;