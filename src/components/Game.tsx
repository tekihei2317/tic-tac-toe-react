import { useGame } from "../hooks/useGame";
import { Board } from "./Board";

export const Game: React.FC = () => {
  const { state, handleClick, status, jumpTo } = useGame();

  const moves = state.history.map((_, move) => {
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
