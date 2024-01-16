import React from "react";
import Square from './Square';

function Board({ squares, onClick }) {
    // You can create a renderSquare function to simplify your code
    function renderSquare(i) {
        return <Square value={squares[i]} onClick={() => onClick(i)} />;
    }

    return (
        <div>
            {/* Removed the status div from here */}
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

export default Board;
