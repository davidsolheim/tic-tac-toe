import useState from "react";
import React from "react";
import "./App.css";
import Board from "./components/Board";


export default function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
};