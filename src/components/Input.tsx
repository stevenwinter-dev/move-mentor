import { useEffect, useState } from 'react';

interface InputProps {
  label: string;
  onChange: (value: string) => void;
}

export const Input = ({ label, onChange }: InputProps) => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPlayer(value);
    onChange(value);
  };

  useEffect(() => {
    // Load players data from players.json
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/players.json');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setPlayers(data.Players);
      } catch (error) {
        console.error('Error loading players data:', error);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPlayers();
  }, []);

  return (
    <div>
      <label htmlFor="playerSelect">{label}</label>
      <select id="playerSelect" className="w-full rounded-lg bg-white text-gray-800 border-gray-300 py-2 px-4" value={selectedPlayer} onChange={handleSelectChange}>
        {players.map((player, index) => (
          <option key={index} value={player}>
            {player}
          </option>
        ))}
      </select>
    </div>
  );
};
