import { useState } from "react";
import Square from './Square';

function Board({ xIsNext, squares, onPlay }) {
    const winner = calculateWinner(squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;

    function handleClick(i) {
        if (squares[i] || winner) {
            return; // If the square is already filled or if there's a winner, return early
        }
        const nextSquares = squares.slice(); // Create a copy of the squares state
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares);
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const winningLines = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Left diagonal
        [2, 4, 6], // Right diagonal
    ];
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // Return the winner (X or O)
        }
    }
    return null; // If there is no winner, return null
}

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[history.length - 1];

    function handlePlay(nextSquares) {
        setHistory([...history, nextSquares]);
        setXIsNext(!xIsNext);
    }

    function jumpTo(move) {
        setHistory(history.slice(0, move + 1));
        setXIsNext((move % 2) === 0);
    }
    // Updated status logic to include tie game condition
    const winner = calculateWinner(currentSquares);
    const isBoardFull = currentSquares.every(square => square !== null);
    const status = winner
        ? `Winner: ${winner}`
        : isBoardFull
        ? "Tie Game"
        : `Next player: ${xIsNext ? "X" : "O"}`;


    const moves = history.map((step, move) => {
        const description = move ? `Go to move #${move}` : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}