import { useState } from "react";
import { Square } from "./Square";

type Player = "X" | "O";

function calculateNextPlayer(player: Player) {
  return player === "X" ? "O" : "X";
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

  const handleClick = (i: number) => {
    const squares = state.squares.slice();
    squares[i] = state.nextPlayer;
    setState({ squares, nextPlayer: calculateNextPlayer(state.nextPlayer) });
  };

  const renderSquare = (i: number) => {
    return <Square value={state.squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div>
      <div className="status">Next Player: {state.nextPlayer}</div>
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
