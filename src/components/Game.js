import React, { useState } from "react";
import Board from './Board';
import { calculateWinner } from "./CalculateWinner";
import Leaderboard from './Leaderboard'; 


export default function Game() {
    const [leaderBoard, setLeaderBoard] = useState([]); // This line should be inside the component
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const currentSquares = history[history.length - 1];
    const [winnerInitials, setWinnerInitials] = useState('');

    function handlePlay(i) {
        const historyPoint = history
.slice(0, history.length);
const current = historyPoint[historyPoint.length - 1];
const squares = [...current];

    // If user clicks an occupied square or if game is won, return
    if (calculateWinner(squares) || squares[i]) return;
    
    // Fill the square with X or O
    squares[i] = xIsNext ? "X" : "O";
    setHistory([...historyPoint, squares]);
    setXIsNext(!xIsNext); // Switch turns
    }
    function handleWinSubmit(event) {
        event.preventDefault(); // Prevent form submission from reloading the page
        const updatedLeaderBoard = [...leaderBoard];
        const playerIndex = updatedLeaderBoard.findIndex(entry => entry.initials === winnerInitials);
        function resetGame() {
            setHistory([Array(9).fill(null)]);
            setXIsNext(true);
            // Reset any other state that indicates the progress or completion of the game
        }
        
        if (playerIndex >= 0) {
            // Player already on leaderboard, increment their wins
            updatedLeaderBoard[playerIndex].wins++;
        } else {
            // Add new player to the leaderboard
            updatedLeaderBoard.push({ initials: winnerInitials, wins: 1 });
        }

        setLeaderBoard(updatedLeaderBoard);
        setWinnerInitials(''); //Reset for next winner
        resetGame();
    }
const winner = calculateWinner(currentSquares);
const status = winner
    ? `Winner: ${winner}`
    : currentSquares.every(Boolean) ? "Tie Game" : `Next player: ${xIsNext ? "X" : "O"}`;

const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
        <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
    );
});

function jumpTo(step) {
    setHistory(history.slice(0, step + 1));
    setXIsNext(step % 2 === 0);
}
console.log('Leaderboard state in Game component:', leaderBoard);
return (
    <>
        <h1>Tic Tac Toe</h1>
        {winner && (
            <form onSubmit={handleWinSubmit}>
                <label>
                    Enter your initials:
                    <input
                        type="text"
                        value={winnerInitials}
                        onChange={(e) => setWinnerInitials(e.target.value)}
                        maxLength="3" // Optionally limit the length of the initials
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        )}
        <Leaderboard leaderboard={leaderBoard} />
        <div className="game">
            <div className="game-board">
                <Board squares={currentSquares} onClick={handlePlay} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    </>
);
}