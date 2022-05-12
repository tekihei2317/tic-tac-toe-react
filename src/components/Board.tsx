import { useState } from "react";
import { Square } from "./Square";

type Player = "X" | "O";

function calculateNextPlayer(player: Player) {
  return player === "X" ? "O" : "X";
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const Board: React.FC = () => {
  type BoardState = {
    squares: (string | null)[];
    nextPlayer: Player;
  };
  const [state, setState] = useState<BoardState>({
    squares: Array(9).fill(null),
    nextPlayer: "X",
  });

  // winnerはなぜ再計算されるのだろうか？
  const winner = calculateWinner(state.squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${state.nextPlayer}`;

  const handleClick = (i: number) => {
    if (calculateWinner(state.squares) || state.squares[i]) {
      return;
    }

    const squares = state.squares.slice();
    squares[i] = state.nextPlayer;
    setState({ squares, nextPlayer: calculateNextPlayer(state.nextPlayer) });
  };

  const renderSquare = (i: number) => {
    return <Square value={state.squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div>
      <div className="status">{status}</div>
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
};
