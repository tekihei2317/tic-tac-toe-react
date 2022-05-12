import { useState } from "react";
import "./App.css";

type SquareProps = { value: number };
const Square: React.FC<SquareProps> = ({ value }) => {
  return <div className="square">{value}</div>;
};

const App: React.FC = () => {
  const [status, setStatus] = useState("Next Player: X");

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={1} />
        <Square value={2} />
        <Square value={3} />
      </div>
      <div className="board-row">
        <Square value={4} />
        <Square value={5} />
        <Square value={6} />
      </div>
      <div className="board-row">
        <Square value={7} />
        <Square value={8} />
        <Square value={9} />
      </div>
    </div>
  );
};

export default App;
