import React, { useCallback, useEffect, useState } from "react";
import {  Player, Winner } from "../types";
import { getWinner } from "../utils";
import celebratingImage from "./../assets/images/celebrating.png";
import "./app.scss";



const initBoard = (size: number) => {
  const board = [];

  for (let i = 0; i < size; i++) {
    board[i] = Array.from({ length: size }, (_) => "");
  }

  return board;
};

function App() {
  const [boardWidth, setBoardWidth] = useState(3);
  const [board, setBoard] = useState<string[][]>(() => initBoard(boardWidth));
  const [firstPlayer] = useState(Player.X);
  const [secondPlayer] = useState(Player.O);
  const [nextPlayer, setNextPlayer] = useState(firstPlayer);
  const [winner, setWinner] = useState<Winner>("None");

  const handleResetGame = useCallback(() => {
    setBoard(initBoard(boardWidth));
    setNextPlayer(firstPlayer);
    setWinner("None");
  }, [boardWidth, firstPlayer]);

  const handleBoardWidthChange = useCallback((event) => {
    const boardWidth = Number(event.target.value);

    if (boardWidth < 3 || boardWidth > 15) {
      return;
    }

    setBoardWidth(boardWidth);
  }, []);

  const handleClickCell = useCallback(
    (rowIndex: number, colIndex: number): void => {
      if (!!board[rowIndex][colIndex]) return;

      const updatedBoard = [...board];
      updatedBoard[rowIndex][colIndex] = nextPlayer;

      setWinner(
        getWinner(
          updatedBoard,
          boardWidth,
          nextPlayer,
          firstPlayer,
          secondPlayer
        )
      );

      setNextPlayer((current) =>
        current === firstPlayer ? secondPlayer : firstPlayer
      );

      setBoard(updatedBoard);
    },
    [boardWidth, board, nextPlayer, firstPlayer, secondPlayer]
  );

  useEffect(() => {
    handleResetGame();
  }, [handleResetGame]);

  return (
    <div className="App">
      <div className="next-player-wrapper">
        Next player:
        <span
          className={`${
            nextPlayer === firstPlayer ? "player-one" : "player-two"
          }`}
        >
          {nextPlayer}
        </span>
      </div>

      <div className="winner-wrapper">
        Winner: <span>{winner}</span>
      </div>

      {winner !== "None" && (
        <div className="celebrating-img-wrapper">
          <img src={celebratingImage} alt="celebrating" />
        </div>
      )}

      <div className="board-size-wrapper">
        <div className="board-size-input-wrapper">
          <label htmlFor="board-size">Board size </label>
          <input
            type="number"
            id="board-size"
            value={boardWidth}
            onChange={handleBoardWidthChange}
          />
        </div>
      </div>

      <div className="reset-wrapper">
        <button onClick={handleResetGame}>Reset</button>
      </div>

      <div className="board-wrapper">
        {board.map((row, rowIndex) => (
          <div className="row" key={`row(${rowIndex})`}>
            {row.map((_col, colIndex) => (
              <button
                key={`cell(${rowIndex}, ${colIndex})`}
                onClick={() => handleClickCell(rowIndex, colIndex)}
                disabled={winner !== "None" || !!board[rowIndex][colIndex]}
                className={`cell ${
                  boardWidth > 2 && boardWidth < 7 ? "large" : ""
                } ${boardWidth > 6 && boardWidth < 10 ? "medium" : ""} ${
                  boardWidth > 9 && boardWidth < 13 ? "small" : ""
                } ${boardWidth > 12 && boardWidth < 16 ? "x-small" : ""} ${
                  board[rowIndex][colIndex] === firstPlayer ? "player-one" : ""
                } ${
                  board[rowIndex][colIndex] === secondPlayer ? "player-two" : ""
                }`}
              >
                {board[rowIndex][colIndex]}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
