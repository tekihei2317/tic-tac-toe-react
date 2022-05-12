import { useState } from "react";
import { Player, calculateWinner, calculateNextPlayer } from "../utils/game";

type BoardState = {
  history: {
    squares: (string | null)[];
  }[];
  stepNumber: number;
  nextPlayer: Player;
};

export const useGame = () => {
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

  return { state, handleClick, currentState, status, jumpTo };
};
