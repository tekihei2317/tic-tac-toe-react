import { useState } from "react";
import { Player, calculateWinner, calculateNextPlayer } from "../utils/game";
import { Board } from "./Board";

export const Game: React.FC = () => {
  type BoardState = {
    squares: (string | null)[];
    nextPlayer: Player;
  };
  const [state, setState] = useState<BoardState>({
    squares: Array(9).fill(null),
    nextPlayer: "X",
  });

  const winner = calculateWinner(state.squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${state.nextPlayer}`;

  const handleClick = (i: number) => {
    if (calculateWinner(state.squares) || state.squares[i]) {
      return;
    }

    const newSquares = state.squares.slice();
    newSquares[i] = state.nextPlayer;
    setState({
      squares: newSquares,
      nextPlayer: calculateNextPlayer(state.nextPlayer),
    });
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={state.squares} handleClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
};
