import { useState } from "react";
import { Player, calculateWinner, calculateNextPlayer } from "../utils/game";
import { Board } from "./Board";

export const Game: React.FC = () => {
  type BoardState = {
    history: {
      squares: (string | null)[];
    }[];
    stepNumber: number;
    nextPlayer: Player;
  };
  const [state, setState] = useState<BoardState>({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    nextPlayer: "X",
  });

  const handleClick = (i: number) => {
    if (calculateWinner(currentState.squares) || currentState.squares[i]) {
      return;
    }

    const newSquares = currentState.squares.slice();
    newSquares[i] = state.nextPlayer;
    setState({
      history: state.history
        .slice(0, state.stepNumber + 1)
        .concat([{ squares: newSquares }]),
      stepNumber: state.stepNumber + 1,
      nextPlayer: calculateNextPlayer(state.nextPlayer),
    });
  };

  const history = state.history;
  const currentState = history[state.stepNumber];
  const winner = calculateWinner(currentState.squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${state.nextPlayer}`;

  const jumpTo = (move: number) => {
    setState({
      history: state.history,
      stepNumber: move,
      nextPlayer: move % 2 === 0 ? "X" : "O",
    });
  };

  const moves = history.map((_, move) => {
    const description = move === 0 ? "Go to game start" : `Go to move #${move}`;

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={state.history[state.stepNumber].squares}
          handleClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>{moves}</div>
      </div>
    </div>
  );
};
