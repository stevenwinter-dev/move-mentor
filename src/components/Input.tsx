interface InputProps {
    label: string;
  }

export const Input = ({label}: InputProps) => {
    const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
  
    return (
      <div>
        <label htmlFor="playerSelect">{label}</label>
        <select id="playerSelect" className="w-full rounded-lg bg-white text-gray-800 border-gray-300 py-2 px-4">
          {players.map((player, index) => (
            <option key={index} value={player}>
              {player}
            </option>
          ))}
        </select>
      </div>
    );
  };